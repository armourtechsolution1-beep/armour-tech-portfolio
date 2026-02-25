import { StickyHeader } from "@/components/member_enhanced/StickyHeader";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <StickyHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}