DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public AUTHORIZATION postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role, supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role, supabase_auth_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role, supabase_auth_admin;

CREATE DOMAIN currency_code AS CHAR(3) CHECK (VALUE ~ '^[A-Z]{3}$');
CREATE DOMAIN monetary_amount AS NUMERIC(20,2);
CREATE DOMAIN phone_number AS TEXT CHECK (VALUE ~ '^\+?[0-9\s\-\(\)]{10,}$');
CREATE DOMAIN wallet_number AS TEXT CHECK (VALUE ~ '^[A-Z]{3}-\d{6,}$');
CREATE TYPE user_type AS ENUM (
    'individual',
    'corporate'
);
CREATE TYPE subscription_tier AS ENUM (
    'free',
    'premium',
    'enterprise'
);
CREATE TYPE user_status AS ENUM (
    'active',
    'inactive',
    'suspended',
    'banned'
);
CREATE TYPE group_type AS ENUM (
    'chama',
    'investment',
    'savings',
    'cooperative'
);
CREATE TYPE group_visibility AS ENUM (
    'private',
    'invite_only',
    'public'
);
CREATE TYPE group_status AS ENUM (
    'active',
    'suspended',
    'closed'
);
CREATE TYPE group_member_status AS ENUM (
    'active',
    'suspended',
    'exited',
    'pending'
);
CREATE TYPE group_role AS ENUM (
    'member',
    'admin',
    'treasurer',
    'chairperson'
);
CREATE TYPE platform_role AS ENUM (
    'individual_user',     
    'group_member',  
    'group_administrator',
    'system_process'
);
DROP TABLE IF EXISTS public.users cascade;
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    first_name TEXT NOT NULL CHECK (length(first_name) >= 1) DEFAULT 'User',
    last_name TEXT NOT NULL CHECK (length(last_name) >= 1) DEFAULT 'name',
    other_name TEXT,
    email TEXT UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    primary_phone phone_number UNIQUE,
    secondary_phone phone_number,
    display_name TEXT NOT NULL CHECK (length(display_name) >= 2),
    date_of_birth DATE CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years'),
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    national_id TEXT,
    id_verified_at TIMESTAMPTZ,
    trust_score DECIMAL(5,2) NOT NULL DEFAULT 0.00 
        CHECK (trust_score >= 0 AND trust_score <= 100),
    user_type user_type NOT NULL DEFAULT 'individual',
    subscription_tier subscription_tier NOT NULL DEFAULT 'free',
    user_status user_status NOT NULL DEFAULT 'active',
    profile_pic_url TEXT,
    cover_photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT valid_individual CHECK (
        user_type != 'corporate' OR national_id IS NOT NULL
    )
);
CREATE INDEX idx_users_status ON users(user_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_trust_score ON users(trust_score DESC) WHERE deleted_at IS NULL;
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Accounts
CREATE TYPE account_type AS ENUM (
    -- User accounts
    'personal',           -- Mandatory account for each user
    'group_shared',       -- Group account
    'group_escrow',       -- For holding funds in transit
    'group_savings',      -- Group savings account
    'group_investment',   -- Group investment account
    -- Loan accounts
    'loan_receivable',    -- Loan account for borrower
    'loan_payable',       -- Loan account for lender
    -- Savings accounts
    'savings',           -- User savings account
    -- Overdraft account
    'overdraft',
    -- System accounts
    'system_clearing',    -- For pending transactions
    'system_settlement',  -- Settlement with external systems
    'system_fee_income',  -- Fee collection
    'system_revenue'      -- Platform revenue
);
CREATE TYPE account_status AS ENUM (
    'active',
    'frozen',
    'closed',
    'dormant'
);
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS TEXT AS $$
DECLARE
    v_num TEXT;
BEGIN
    LOOP
        v_num := 
            'TL' ||
            LPAD((floor(random() * 100))::text, 2, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0');

        -- Ensure uniqueness
        EXIT WHEN NOT EXISTS (
            SELECT 1 FROM accounts WHERE account_number = v_num
        );
    END LOOP;

    RETURN v_num;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION gen_group_code()
RETURNS TEXT AS $$
DECLARE
    g_num TEXT;
BEGIN
    LOOP
        g_num := 
            'GRP' ||
            LPAD((floor(random() * 100))::text, 2, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0');
        EXIT WHEN NOT EXISTS (
            SELECT 1 FROM groups WHERE group_code = g_num
        );
    END LOOP;
    RETURN g_num;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION gen_wallet_num()
RETURNS TEXT AS $$
DECLARE
    w_num TEXT;
BEGIN
    LOOP
        w_num := 
            'WLT' ||
            LPAD((floor(random() * 100))::text, 2, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0') || '-' ||
            LPAD((floor(random() * 1000))::text, 3, '0');
        EXIT WHEN NOT EXISTS (
            SELECT 1 FROM wallets WHERE wallet_number = w_num
        );
    END LOOP;
    RETURN w_num;
END;
$$ LANGUAGE plpgsql;
CREATE TABLE groups (
    group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name TEXT NOT NULL CHECK (length(group_name) >= 2),
    description TEXT,
    group_code TEXT UNIQUE NOT NULL default gen_group_code(), 
    group_type group_type NOT NULL,
    visibility group_visibility NOT NULL DEFAULT 'private',
    group_status group_status NOT NULL DEFAULT 'active',
    created_by UUID NOT NULL REFERENCES users(user_id),
    currency currency_code NOT NULL DEFAULT 'KES',
    min_members INTEGER NOT NULL DEFAULT 5 CHECK (min_members >= 2),
    max_members INTEGER CHECK (max_members IS NULL OR max_members >= min_members),
    contribution_policy JSONB DEFAULT '{"type": "monthly", "amount": 0}',
    withdrawal_policy JSONB DEFAULT '{"requires_approval": true}',
    investment_policy JSONB DEFAULT '{"allowed": true, "min_votes": 1}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CHECK (deleted_at IS NULL OR group_status = 'closed')
);
CREATE TABLE group_members (
    group_member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id),
    role group_role NOT NULL DEFAULT 'member',
    status group_member_status NOT NULL DEFAULT 'pending',
    joined_at TIMESTAMPTZ,
    exited_at TIMESTAMPTZ,
    invited_by UUID REFERENCES users(user_id),
    voting_power INTEGER DEFAULT 1 CHECK (voting_power >= 0),
    can_initiate_transfers BOOLEAN DEFAULT false,
    can_approve_withdrawals BOOLEAN DEFAULT false,
    can_manage_investments BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (group_id, user_id),
    CHECK (exited_at IS NULL OR status = 'exited'),
    CHECK (joined_at IS NULL OR status IN ('active', 'suspended'))
);
CREATE INDEX idx_group_members_group ON group_members(group_id);
CREATE INDEX idx_group_members_user ON group_members(user_id);
CREATE INDEX idx_group_members_role ON group_members(role);
CREATE INDEX idx_groups_status ON groups(group_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_groups_created_by ON groups(created_by) WHERE deleted_at IS NULL;
CREATE TYPE wallet_type AS ENUM (
    'personal',
    'group',
    'corporate'
);

CREATE TYPE wallet_status AS ENUM (
    'active',
    'suspended',
    'closed'
);

CREATE TABLE accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number TEXT UNIQUE NOT NULL DEFAULT generate_account_number(),
    account_name TEXT NOT NULL CHECK (length(account_name) >= 2) DEFAULT 'personal account',
    account_type account_type NOT NULL,
    account_status account_status NOT NULL DEFAULT 'active',
    owner_user_id UUID REFERENCES users(user_id),
    owner_group_id UUID REFERENCES groups(group_id),
    currency currency_code NOT NULL DEFAULT 'KES',
    overdraft_limit monetary_amount DEFAULT 0 CHECK (overdraft_limit >= 0),
    allow_negative_balance BOOLEAN NOT NULL DEFAULT FALSE,
    min_balance monetary_amount DEFAULT 0,
    withdrawal_limit_daily monetary_amount DEFAULT 100000,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT single_owner CHECK (
        (owner_user_id IS NOT NULL AND owner_group_id IS NULL) OR
        (owner_user_id IS NULL AND owner_group_id IS NOT NULL) OR
        (account_type IN ('system_clearing', 'system_settlement', 'system_fee_income', 'system_revenue'))
    ),
    CONSTRAINT valid_account_type CHECK (
        -- Personal accounts must have user owner
        NOT (account_type = 'personal' AND owner_user_id IS NULL) AND
        -- Group accounts must have group owner
        NOT (account_type IN ('group_shared', 'group_escrow', 'group_savings', 'group_investment') 
             AND owner_group_id IS NULL)
    )
);

CREATE INDEX idx_accounts_owner_user ON accounts(owner_user_id) 
    WHERE account_status = 'active' AND owner_user_id IS NOT NULL;
CREATE INDEX idx_accounts_owner_group ON accounts(owner_group_id) 
    WHERE account_status = 'active' AND owner_group_id IS NOT NULL;
CREATE INDEX idx_accounts_type ON accounts(account_type);
CREATE INDEX idx_accounts_number ON accounts(account_number);
CREATE TABLE wallets (
    wallet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_number TEXT UNIQUE NOT NULL default gen_wallet_num(),
    owner_type wallet_type NOT NULL,
    owner_user_id UUID REFERENCES users(user_id),
    owner_group_id UUID REFERENCES groups(group_id),
    wallet_name TEXT NOT NULL,
    description TEXT,
    wallet_status wallet_status NOT NULL DEFAULT 'active',
    default_currency currency_code NOT NULL DEFAULT 'KES',
    primary_account_id UUID REFERENCES accounts(account_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at TIMESTAMPTZ,
    CONSTRAINT single_wallet_owner CHECK (
        (owner_type = 'personal' AND owner_user_id IS NOT NULL AND owner_group_id IS NULL) OR
        (owner_type = 'group' AND owner_group_id IS NOT NULL AND owner_user_id IS NULL) OR
        (owner_type = 'corporate' AND owner_user_id IS NOT NULL AND owner_group_id IS NULL)
    ),
    CHECK (closed_at IS NULL OR wallet_status = 'closed')
);
CREATE TABLE wallet_accounts (
    wallet_account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES wallets(wallet_id) ON DELETE CASCADE,
    account_id UUID NOT NULL,
    can_view BOOLEAN NOT NULL DEFAULT true,
    can_transfer_from BOOLEAN NOT NULL DEFAULT false,
    can_transfer_to BOOLEAN NOT NULL DEFAULT false,
    can_withdraw BOOLEAN NOT NULL DEFAULT false,
    can_deposit BOOLEAN NOT NULL DEFAULT true,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (wallet_id, account_id)
);
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    v_personal_account_id UUID;
    v_overdraft_account_id UUID;
    v_wallet_id UUID;
BEGIN
    -- 1. Create user profile in your users table
    INSERT INTO public.users(
        user_id,
        display_name,
        email,
        primary_phone
    )
    VALUES(
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
        NEW.email,
        COALESCE(NEW.phone, NULL)
    );

    -- 2. Create personal account
    INSERT INTO public.accounts(
        account_name,
        account_type,
        owner_user_id
    )
    VALUES(
        'Personal Account',
        'personal',
        NEW.id
    )
    RETURNING account_id INTO v_personal_account_id;

    -- 3. Create overdraft account
    INSERT INTO public.accounts(
        account_name,
        account_type,
        account_status,
        owner_user_id
    )
    VALUES(
        'Overdraft Account',
        'overdraft',
        'dormant',
        NEW.id
    )
    RETURNING account_id INTO v_overdraft_account_id;

    -- 4. Create a wallet for the user
    INSERT INTO public.wallets(
        owner_type,
        owner_user_id,
        wallet_name,
        primary_account_id
    )
    VALUES(
        'personal',
        NEW.id,
        CONCAT('Wallets - ', NEW.email),
        v_personal_account_id
    )
    RETURNING wallet_id INTO v_wallet_id;

    -- 5. Link both accounts inside the wallet
    INSERT INTO public.wallet_accounts(wallet_id, account_id, can_transfer_from, can_withdraw)
    VALUES (v_wallet_id, v_personal_account_id, true, true);

    INSERT INTO public.wallet_accounts(wallet_id, account_id, can_transfer_from, can_withdraw)
    VALUES (v_wallet_id, v_overdraft_account_id, false, false);

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created  ON auth.users;
CREATE TRIGGER on_auth_user_created 
AFTER INSERT ON auth.users
FOR EACH row
execute function handle_new_auth_user();
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Transactions
CREATE TYPE transaction_type AS ENUM (
    -- Money movement
    'deposit',
    'withdrawal',
    'internal_transfer',
    'external_transfer',
    'p2p_transfer',
    'group_contribution',
    'group_disbursement',
    -- Loan operations
    'loan_disbursement',
    'loan_repayment',
    'loan_interest',
    'loan_penalty',
    -- Fees
    'transaction_fee',
    'subscription_fee',
    'service_fee',
    'withdrawal_fee',
    'transfer_fee',
    -- Project operations
    'project_investment',
    'project_distribution',
    'project_expense',
    -- System
    'system_adjustment',
    'reversal',
    'settlement'
);
CREATE TYPE transaction_status AS ENUM (
    'pending',      -- Initiated but not settled (available balance affected)
    'processing',   -- Being processed
    'completed',    -- Finalized irreversible commitment
    'failed',       -- Unsuccessful attempt
    'reversed'      -- Correction of completed transaction
);
CREATE SEQUENCE transaction_ref_seq START 1000000;
CREATE OR REPLACE FUNCTION generate_transaction_ref()
RETURNS TEXT AS $$
DECLARE
    prefix TEXT;
    year_month TEXT;
    sequence_num INTEGER;
    formatted_seq TEXT;
BEGIN
    prefix := 'TRX';
    year_month := to_char(CURRENT_DATE, 'YYYYMM');
    sequence_num := nextval('transaction_ref_seq');
    formatted_seq := lpad(sequence_num::text, 8, '0');
    RETURN prefix || '-' || year_month || '-' || formatted_seq;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_ref TEXT UNIQUE NOT NULL DEFAULT generate_transaction_ref(),
    transaction_type transaction_type NOT NULL,
    status transaction_status NOT NULL DEFAULT 'pending',
    amount monetary_amount NOT NULL CHECK (amount > 0),
    currency currency_code NOT NULL DEFAULT 'KES',
    initiated_by UUID REFERENCES users(user_id),
    initiated_from_wallet_id UUID REFERENCES wallets(wallet_id),
    source_account_id UUID REFERENCES accounts(account_id),
    destination_account_id UUID REFERENCES accounts(account_id),
    external_reference TEXT, -- e.g., M-Pesa transaction ID, bank reference
    external_provider TEXT CHECK (external_provider IN ('mpesa', 'bank', 'agent', NULL)),
    provider_response JSONB,
    timeout_at TIMESTAMPTZ,
    callback_received_at TIMESTAMPTZ,
    last_callback_check TIMESTAMPTZ,
    hold_released_at TIMESTAMPTZ,
    authorization_code TEXT,
     description TEXT,
     metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    reversed_at TIMESTAMPTZ,
    CHECK (
        (source_account_id IS NOT NULL AND destination_account_id IS NOT NULL) OR
        transaction_type IN ('deposit', 'withdrawal', 'system_adjustment')
    ),
    CHECK (
        (status = 'completed' AND completed_at IS NOT NULL) OR
        (status != 'completed' AND completed_at IS NULL)
    )
);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX idx_transactions_source ON transactions(source_account_id, created_at DESC);
CREATE INDEX idx_transactions_destination ON transactions(destination_account_id, created_at DESC);
CREATE INDEX idx_transactions_wallet ON transactions(initiated_from_wallet_id);
CREATE INDEX idx_transactions_external ON transactions(external_provider, external_reference) 
    WHERE external_provider IS NOT NULL;
CREATE TYPE ledger_entry_type AS ENUM (
    'debit',
    'credit'
);
CREATE TYPE ledger_entry_status AS ENUM (
    'pending',   -- Recorded but not settled
    'posted',    -- Finalized entry
    'reversed'   -- Compensating entry
);
CREATE TABLE ledger_entries (
    ledger_entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(account_id),
    entry_type ledger_entry_type NOT NULL,
    amount monetary_amount NOT NULL CHECK (amount > 0),
    status ledger_entry_status NOT NULL DEFAULT 'pending',
    balance_before monetary_amount,
    balance_after monetary_amount,
    reference TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     UNIQUE(transaction_id, account_id, entry_type, status)
);
CREATE INDEX idx_ledger_account ON ledger_entries(account_id, created_at DESC);
CREATE INDEX idx_ledger_transaction ON ledger_entries(transaction_id);
CREATE INDEX idx_ledger_status ON ledger_entries(status);
CREATE INDEX idx_ledger_account_status ON ledger_entries(account_id, status, created_at DESC);
CREATE VIEW account_balances AS
SELECT 
    a.account_id,
    a.account_number,
    a.account_name,
    a.account_type,
    a.account_status,
    a.currency,

    /* BOOK BALANCE */
    COALESCE(
      SUM(CASE WHEN le.status = 'posted'   AND le.entry_type = 'credit' THEN le.amount ELSE 0 END) -
      SUM(CASE WHEN le.status = 'posted'   AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END),
      0
    ) AS book_balance,

    /* HOLD BALANCE */
    COALESCE(
      SUM(CASE WHEN le.status = 'pending'  AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END) -
      SUM(CASE WHEN le.status = 'pending'  AND le.entry_type = 'credit' THEN le.amount ELSE 0 END),
      0
    ) AS hold_balance,

    /* AVAILABLE BALANCE */
    (
      COALESCE(
        SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END) -
        SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END),
        0
      )
      -
      COALESCE(
        SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'debit' THEN le.amount ELSE 0 END) -
        SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END),
        0
      )
    ) AS available_balance,

    /* EFFECTIVE AVAILABLE BALANCE */
    CASE 
      WHEN a.overdraft_limit > 0 THEN
          (
            COALESCE(
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END),
              0
            )
            -
            COALESCE(
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'debit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END),
              0
            )
            + a.overdraft_limit
          )
      WHEN a.allow_negative_balance THEN
          (
            COALESCE(
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END),
              0
            )
            -
            COALESCE(
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'debit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END),
              0
            )
          )
      ELSE 
          (
            COALESCE(
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'posted' AND le.entry_type = 'debit'  THEN le.amount ELSE 0 END),
              0
            )
            -
            COALESCE(
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'debit' THEN le.amount ELSE 0 END) -
              SUM(CASE WHEN le.status = 'pending' AND le.entry_type = 'credit' THEN le.amount ELSE 0 END),
              0
            )
          )
    END AS effective_available_balance

FROM accounts a
LEFT JOIN ledger_entries le ON a.account_id = le.account_id
WHERE a.account_status = 'active'
GROUP BY a.account_id, a.account_number, a.account_name, a.account_type,
         a.account_status, a.currency, a.overdraft_limit, a.allow_negative_balance;
CREATE VIEW wallet_balances AS
SELECT 
    w.wallet_id,
    w.wallet_number,
    w.wallet_name,
    w.owner_type,
    w.owner_user_id,
    w.owner_group_id,
    w.default_currency,
    
    -- Aggregate balances from all accounts in wallet
    COUNT(DISTINCT wa.account_id) AS account_count,
    
    -- Sum of book balances
    COALESCE(SUM(ab.book_balance), 0) AS total_book_balance,
    
    -- Sum of available balances
    COALESCE(SUM(ab.available_balance), 0) AS total_available_balance,
    
    -- Sum of effective available (with overdraft)
    COALESCE(SUM(ab.effective_available_balance), 0) AS total_effective_available,
    
    -- Primary account info
    w.primary_account_id,
    pa.account_number AS primary_account_number
    
FROM wallets w
LEFT JOIN wallet_accounts wa ON w.wallet_id = wa.wallet_id
LEFT JOIN account_balances ab ON wa.account_id = ab.account_id
LEFT JOIN accounts pa ON w.primary_account_id = pa.account_id
WHERE w.wallet_status = 'active'
GROUP BY w.wallet_id, w.wallet_number, w.wallet_name, w.owner_type,
         w.owner_user_id, w.owner_group_id, w.default_currency,
         w.primary_account_id, pa.account_number;
CREATE TYPE fee_charge_to AS ENUM (
    'sender',
    'receiver',
    'system'
);

CREATE TYPE fee_calculation AS ENUM (
    'fixed',
    'percentage',
    'tiered',
    'mixed'
);

CREATE TYPE fee_application AS ENUM (
    'always',
    'only_withdrawals',
    'only_external_transfers',
    'only_loan_repayments',
    'only_project_activities'
);
CREATE TABLE fee_templates (
    fee_template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_code TEXT UNIQUE NOT NULL,
    fee_name TEXT NOT NULL,
    description TEXT,
    transaction_type transaction_type NOT NULL,
    apply_to_user_type user_type[],
    apply_to_tier subscription_tier[],
    application_rule fee_application NOT NULL DEFAULT 'always',
    fee_calculation fee_calculation NOT NULL,
    fixed_amount monetary_amount,
    percentage_rate DECIMAL(7,4),
    min_fee monetary_amount,
    max_fee monetary_amount,
    charge_to fee_charge_to NOT NULL DEFAULT 'sender',
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (
        (fee_calculation = 'fixed' AND fixed_amount IS NOT NULL) OR
        (fee_calculation = 'percentage' AND percentage_rate IS NOT NULL) OR
        (fee_calculation = 'mixed' AND fixed_amount IS NOT NULL AND percentage_rate IS NOT NULL)
    ),
    CHECK (effective_to IS NULL OR effective_to > effective_from)
);
CREATE TABLE applied_fees (
    applied_fee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    fee_template_id UUID NOT NULL REFERENCES fee_templates(fee_template_id),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'charged', 'waived', 'refunded')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    charged_at TIMestAMPTZ
);
CREATE OR REPLACE FUNCTION process_transaction(
    p_transaction_type transaction_type,
    p_amount monetary_amount,
    p_source_account_id UUID,
    p_destination_account_id UUID,
    p_initiated_by UUID,
    p_initiated_from_wallet_id UUID DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    v_transaction_id UUID;
    v_source_account accounts;
    v_dest_account accounts;
    v_available_balance monetary_amount;
    v_fee_amount monetary_amount := 0;
    v_fee_template_id UUID;
    v_sys_rev UUID;
BEGIN
    -- Lock accounts for safe concurrent balance checking
    SELECT * INTO v_source_account FROM accounts WHERE account_id = p_source_account_id FOR UPDATE;
    SELECT * INTO v_dest_account FROM accounts WHERE account_id = p_destination_account_id FOR UPDATE;

    SELECT account_id INTO v_sys_rev
    FROM accounts
    WHERE account_type = 'system_revenue'
    LIMIT 1;

    IF v_sys_rev IS NULL THEN
        RAISE EXCEPTION 'System revenue account missing!';
    END IF;

    -- Lookup fee
    SELECT ft.fee_template_id,
           CASE 
             WHEN ft.fee_calculation = 'fixed' THEN ft.fixed_amount
             WHEN ft.fee_calculation = 'percentage' THEN (p_amount * ft.percentage_rate) / 100
             WHEN ft.fee_calculation = 'mixed' THEN ft.fixed_amount + ((p_amount * ft.percentage_rate) / 100)
           END
    INTO v_fee_template_id, v_fee_amount
    FROM fee_templates ft
    WHERE ft.transaction_type = p_transaction_type
      AND is_active = TRUE
    ORDER BY effective_from DESC
    LIMIT 1;

    v_fee_amount := COALESCE(v_fee_amount, 0);

    SELECT available_balance INTO v_available_balance
    FROM account_balances
    WHERE account_id = p_source_account_id;

    IF v_available_balance < (p_amount + v_fee_amount)
       AND NOT v_source_account.allow_negative_balance THEN
         RAISE EXCEPTION 'Insufficient balance';
    END IF;

    -- Create transaction record
    INSERT INTO transactions (
        transaction_type, amount, source_account_id, destination_account_id,
        initiated_by, initiated_from_wallet_id, status, description, metadata
    ) VALUES (
        p_transaction_type, p_amount, p_source_account_id, p_destination_account_id,
        p_initiated_by, p_initiated_from_wallet_id, 'processing', p_description, p_metadata
    ) RETURNING transaction_id INTO v_transaction_id;

    -- Ledger entries for transfer
    INSERT INTO ledger_entries (transaction_id, account_id, entry_type, amount, status, description)
    VALUES
      (v_transaction_id, p_source_account_id, 'debit',  p_amount, 'pending', p_description),
      (v_transaction_id, p_destination_account_id, 'credit', p_amount, 'pending', p_description);

    -- Ledger fee
    IF v_fee_amount > 0 THEN
        INSERT INTO applied_fees (transaction_id, fee_template_id, status)
        VALUES (v_transaction_id, v_fee_template_id, 'pending');

        INSERT INTO ledger_entries (transaction_id, account_id, entry_type, amount, status, description)
        VALUES
          (v_transaction_id, p_source_account_id, 'debit',  v_fee_amount, 'pending', 'transaction fee'),
          (v_transaction_id, v_sys_rev, 'credit', v_fee_amount, 'pending', 'transaction fee');
    END IF;

    -- Commit transaction state
    UPDATE transactions
    SET status = 'completed', completed_at = now()
    WHERE transaction_id = v_transaction_id;

    RETURN v_transaction_id;

EXCEPTION WHEN OTHERS THEN
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Function to get user wallet summary
CREATE OR REPLACE FUNCTION get_user_wallet_summary(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
  v_wallet_id UUID;
  v_total_balance NUMERIC;
  v_income NUMERIC;
  v_expense NUMERIC;
BEGIN
  -- Get user's primary wallet
  SELECT wallet_id INTO v_wallet_id
  FROM wallets 
  WHERE owner_user_id = p_user_id AND owner_type = 'personal' 
  AND wallet_status = 'active'
  LIMIT 1;

  -- Get total balance from wallet_balances view
  SELECT COALESCE(total_available_balance, 0) INTO v_total_balance
  FROM wallet_balances 
  WHERE wallet_id = v_wallet_id;

  -- Calculate income (credits) for last 30 days
  SELECT COALESCE(SUM(t.amount), 0) INTO v_income
  FROM transactions t
  JOIN accounts a ON t.destination_account_id = a.account_id
  WHERE a.owner_user_id = p_user_id
    AND t.status = 'completed'
    AND t.transaction_type IN ('deposit', 'p2p_transfer', 'loan_disbursement')
    AND t.created_at >= NOW() - INTERVAL '30 days';

  -- Calculate expense (debits) for last 30 days
  SELECT COALESCE(SUM(t.amount), 0) INTO v_expense
  FROM transactions t
  JOIN accounts a ON t.source_account_id = a.account_id
  WHERE a.owner_user_id = p_user_id
    AND t.status = 'completed'
    AND t.transaction_type IN ('withdrawal', 'p2p_transfer', 'loan_repayment', 'group_contribution')
    AND t.created_at >= NOW() - INTERVAL '30 days';

  -- Build result
  v_result := jsonb_build_object(
    'wallet_id', v_wallet_id,
    'total_balance', v_total_balance,
    'monthly_income', v_income,
    'monthly_expense', v_expense,
    'net_flow', v_income - v_expense
  );

  RETURN v_result;
END;
$$;

-- Function to get user accounts with balances
CREATE OR REPLACE FUNCTION get_user_accounts(p_user_id UUID)
RETURNS TABLE (
  account_id UUID,
  account_number TEXT,
  account_name TEXT,
  account_type TEXT,
  account_status TEXT,
  currency TEXT,
  available_balance NUMERIC,
  book_balance NUMERIC,
  can_transfer BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    a.account_id,
    a.account_number,
    a.account_name,
    a.account_type::TEXT,
    a.account_status::TEXT,
    a.currency,
    COALESCE(ab.available_balance, 0) as available_balance,
    COALESCE(ab.book_balance, 0) as book_balance,
    CASE 
      WHEN a.account_type IN ('personal', 'savings') THEN true
      ELSE false
    END as can_transfer
  FROM accounts a
  LEFT JOIN account_balances ab ON a.account_id = ab.account_id
  WHERE a.owner_user_id = p_user_id
    AND a.account_status = 'active'
  ORDER BY 
    CASE a.account_type
      WHEN 'personal' THEN 1
      WHEN 'savings' THEN 2
      ELSE 3
    END,
    a.created_at DESC;
$$;

-- Function to get recent transactions
CREATE OR REPLACE FUNCTION get_recent_transactions(p_user_id UUID, p_limit INT DEFAULT 10)
RETURNS TABLE (
  transaction_id UUID,
  transaction_ref TEXT,
  transaction_type TEXT,
  status TEXT,
  amount NUMERIC,
  currency TEXT,
  description TEXT,
  created_at TIMESTAMPTZ,
  source_account_id UUID,
  destination_account_id UUID,
  is_debit BOOLEAN,
  counterparty TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH user_accounts AS (
    SELECT account_id FROM accounts WHERE owner_user_id = p_user_id
  )
  SELECT 
    t.transaction_id,
    t.transaction_ref,
    t.transaction_type::TEXT,
    t.status::TEXT,
    t.amount,
    t.currency,
    COALESCE(t.description, t.transaction_type::TEXT) as description,
    t.created_at,
    t.source_account_id,
    t.destination_account_id,
    CASE 
      WHEN t.source_account_id IN (SELECT account_id FROM user_accounts) THEN true
      ELSE false
    END as is_debit,
    CASE 
      WHEN t.transaction_type = 'p2p_transfer' AND t.source_account_id IN (SELECT account_id FROM user_accounts) THEN
        (SELECT u.display_name FROM users u 
         JOIN accounts a ON u.user_id = a.owner_user_id 
         WHERE a.account_id = t.destination_account_id)
      WHEN t.transaction_type = 'p2p_transfer' AND t.destination_account_id IN (SELECT account_id FROM user_accounts) THEN
        (SELECT u.display_name FROM users u 
         JOIN accounts a ON u.user_id = a.owner_user_id 
         WHERE a.account_id = t.source_account_id)
      ELSE NULL
    END as counterparty
  FROM transactions t
  WHERE (
    t.source_account_id IN (SELECT account_id FROM user_accounts) OR
    t.destination_account_id IN (SELECT account_id FROM user_accounts)
  )
  ORDER BY t.created_at DESC
  LIMIT p_limit;
$$;