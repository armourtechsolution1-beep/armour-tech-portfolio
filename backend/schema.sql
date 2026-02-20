CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE ServiceRequestStatus AS ENUM(
    'pending',
    'processed',
    'rejected'
);
CREATE TYPE DocumentReqStatus AS ENUM(
    'pending',
    'approved',
    'rejected'
);
CREATE TYPE Gender AS ENUM (
    'male',
    'female',
    'other',
    'prefer_not_to_say'
);
CREATE TYPE ProjectType AS ENUM (
    'android',
    'web',
    'ios',
    'windows',
    'cross_platform',
    'command_line',
    'gaming',
    'library'
);
CREATE TYPE ContactType AS ENUM (
    'facebook',
    'instagram',
    'email',
    'discord',
    'github',
    'whatsapp',
    'telephone',
    'website'
);
CREATE TYPE DocumentType AS ENUM (
    'certificate',
    'resume',
    'transcipts',
    'recommendation',
    'thesis'
);
CREATE TYPE DocumentPrivacy AS ENUM (
    'private',
    'public',
    'read_only'
);
CREATE TYPE PatnerType AS ENUM (
    'individual',
    'company',
    'government',
    'organization',
    'non_govermental_organization'
);
CREATE TYPE WorkType AS ENUM (
    'freelance',
    'volunteer',
    'employment',
    'internship'
);
CREATE TYPE ContactAvailability As ENUM (
    'unavailable',
    'alltime',
    'weekends',
    'weekdays',
    'monthly',
    'annually'
);
CREATE TYPE ServiceType As ENUM (
    'app_development',
    'database_design',
    'software_upgrade',
    'application_design'
);
CREATE TABLE IF NOT EXISTS Organization (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_name TEXT UNIQUE NOT NULL CHECK (length(org_name)>=1),
    objective TEXT NOT NULL,
    logo_url TEXT NOT NULL DEFAULT '/logo.jpeg',
    cover_photo_url TEXT, 
    display_photo_url TEXT, 
    about TEXT, 
    date_formed DATE CHECK(date_formed <= CURRENT_DATE),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS Member (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL CHECK(length(first_name)>=1),
    last_name TEXT NOT NULL  CHECK(length(last_name)>=1),
    other_name TEXT ,
    gender Gender NOT NULL DEFAULT 'prefer_not_to_say',
    nationality TEXT DEFAULT 'kenyan',
    date_of_birth DATE CHECK(date_of_birth <= CURRENT_DATE),
    about TEXT ,
    objective TEXT ,
    personal_statement TEXT ,
    member_title TEXT NOT NULL DEFAULT 'Software Engineer',
    organization_id UUID NOT NULL REFERENCES Organization(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS Project (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proj_name TEXT NOT NULL UNIQUE CHECK(length(proj_name)>=1),
    proj_description TEXT ,
    media_url TEXT ,
    date_started DATE NOT NULL CHECK(date_started <= CURRENT_DATE),
    date_completed DATE CHECK (date_completed >= date_started),
    project_type ProjectType NOT NULL DEFAULT 'web',
    project_details TEXT ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()    
)
CREATE TABLE IF NOT EXISTS CustomerProfile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL DEFAULT 'customer',
    last_name TEXT NOT NULL DEFAULT 'name',
    other_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

)
CREATE TABLE IF NOT EXISTS ContactTemplate (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT  DEFAULT 'facebook',
    base_url TEXT DEFAULT 'https://facebook.com/',
    contact_type ContactType NOT NULL DEFAULT 'facebook',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()    
)
CREATE TABLE IF NOT EXISTS SkillsTemplate (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT NOT NULL DEFAULT 'web-development',
    skill_description TEXT,
    search_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()    
)

CREATE TABLE IF NOT EXISTS FooterStatement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    footer_statement TEXT,
    organization_id UUID NOT NULL REFERENCES Organization(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()    
)
CREATE TABLE IF NOT EXISTS Patner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patner_name TEXT NOT NULL UNIQUE CHECK (length(patner_name)>=1),
    about TEXT
    organization_id UUID NOT NULL REFERENCES Organization(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()    

)
CREATE TABLE IF NOT EXISTS RoleTemplate (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name TEXT NOT NULL UNIQUE CHECK(length(role_name)>=1),
    role_description TEXT ,
    search_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 

)
CREATE TABLE IF NOT EXISTS TechnologiesTemplate (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tech_name TEXT NOT NULL UNIQUE CHECK(length(role_name)>=1),
    tech_description TEXT ,
    site_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS OrganizationContact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES ContactTemplate(id),
    org_id UUID NOT NULL REFERENCES Organization(id),
    user_name TEXT NOT NULL UNIQUE ,
    hyperlink TEXT NOT NULL UNIQUE,
    contact_availability ContactAvailability DEFAULT 'available',
    availability_time_interval JSONB DEFAULT '{"from":"7AM" ,"To":"9PM"}'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)

CREATE TABLE IF NOT EXISTS MemberContact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES ContactTemplate(id),
    member_id UUID NOT NULL REFERENCES Member(id),
    user_name TEXT NOT NULL UNIQUE ,
    hyperlink TEXT NOT NULL UNIQUE,
    contact_availability ContactAvailability DEFAULT 'alltime',
    availability_time_interval JSONB DEFAULT '{"from":"7AM" ,"To":"9PM"}'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS ProjectPhoto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_label TEXT NOT NULL UNIQUE CHECK(length(photo_label)>=1),
    project_id UUID NOT NULL REFERENCES Project(id),
    photo_description TEXT ,
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS ProjectReview (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES Project(id),
    reviewer_id UUID NOT NULL REFERENCES CustomerProfile(id),
    review_message TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK(rating > 0 AND rating <=5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS ProjectTechnology (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES Project(id),
    technology_id UUID NOT NULL REFERENCES TechnologiesTemplate(id),
    percentage_used INTEGER NOT NULL DEFAULT 90 CHECK (percentage_used >=0 AND percentage_used <=100) ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS MemberTechnology (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES Member(id),
    technology_id UUID NOT NULL REFERENCES TechnologiesTemplate(id),
    percentage_mastery INTEGER NOT NULL DEFAULT 80 CHECK (percentage_mastery >=0 AND percentage_mastery <=100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now() 
)
CREATE TABLE IF NOT EXISTS CertificationTemplate (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cert_name TEXT NOT NULL UNIQUE CHECK (length(cert_name)>=1),
    cert_description TEXT ,
    cert_providor TEXT NOT NULL,
    site_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

)
CREATE TABLE IF NOT EXISTS MemberCertification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES Member(id),
    certification_temp_id UUID NOT NULL REFERENCES CertificationTemplate(id),
    certification_level_attained TEXT ,
    date_taken DATE NOT NULL CHECK (date_taken<=CURRENT_DATE),
    date_completed DATE CHECK(date_completed >= date_taken),
    certificate_number TEXT NOT NULL UNIQUE,
    is_valid BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS MemberWorkExperience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title TEXT NOT NULL CHECK(length(job_title)>=1),
    member_id UUID NOT NULL REFERENCES Member(id),
    work_description TEXT,
    company_name TEXT NOT NULL,
    date_started DATE NOT NULL CHECK(date_started <= CURRENT_DATE),
    date_completed DATE CHECK(date_completed => date_started),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS MemberSkill (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES Member(id),
    skill_temp_id UUID NOT NULL REFERENCES SkillsTemplate(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

)
CREATE TABLE IF NOT EXISTS MemberDocument (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES Member(id),
    document_name TEXT NOT NULL DEFAULT 'User Resume',
    source_url TEXT,
    storage_url TEXT,
    document_type DocumentType NOT NULL DEFAULT 'resume',
    document_privacy DocumentPrivacy NOT NULL DEFAULT 'public',
    file_name TEXT NOT NULL DEFAULT 'resume',
    file_size INTEGER NOT NULL ,
    file_type TEXT NOT NULL DEFAULT 'PDF Document',
    file_extension TEXT NOT NULL DEFAULT 'pdf',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS DocumentDownload (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES MemberDocument(id),
    download_source_ip TEXT,
    device_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS PersonalProject (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES Member(id),
    project_id UUID NOT NULL REFERENCES Project(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS OrganizationProject (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES Organization(id),
    project_id UUID NOT NULL REFERENCES Project(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS ProjectTeamMember (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_proj_id UUID NOT NULL REFERENCES OrganizationProject(id),
    member_id UUID NOT NULL REFERENCES Member(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS ProjectTeamRole (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_team_member_id UUID NOT NULL REFERENCES ProjectTeamMember(id),
    role_temp_id UUID NOT NULL REFERENCES RoleTemplate(id),
    contribution_percentage INT DEFAULT 50 (contribution_percentage >=0 AND contribution_percentage <=100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS DocumentDownloadRequests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id NOT NULL REFERENCES MemberDocument(id),
    req_email TEXT NOT NULL,
    req_msg TEXT,
    req_name TEXT ,
    ref_code TEXT,
    req_status DocumentReqStatus DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS Service (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL ,
    service_description TEXT,
    photo_url TEXT,
    estimated_completion_time TEXT DEFAULT 'three months',
    service_type ServiceType DEFAULT 'app_development',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS ServiceTechnology (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES Service(id),
    technology_id UUID NOT NULL REFERENCES TechnologiesTemplate(id),
    percentage_used INTEGER DEFAULT 70 (percentage_used >=0 AND percentage_used <=100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)

CREATE TABLE IF NOT EXISTS CustomerContacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES ContactTemplate(id),
    customer_id UUID NOT NULL REFERENCES CustomerProfile(id),
    user_name TEXT NOT NULL UNIQUE ,
    hyperlink TEXT NOT NULL UNIQUE,
    contact_availability ContactAvailability DEFAULT 'alltime',
    availability_time_interval JSONB DEFAULT '{"from":"7AM" ,"To":"9PM"}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS ServiceRequest (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES Service(id),
    customer_id UUID NOT NULL REFERENCES CustomerProfile(id),
    request_message TEXT,
    req_status ServiceRequestStatus DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
-- checks for percentages
-- add unique constraints for relational tables
-- add indexes for all fk and emails 