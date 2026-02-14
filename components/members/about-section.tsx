import { Member } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  member: Member;
  className?: string;
}

export function AboutSection({ member, className }: AboutSectionProps) {
  const hasContent = member.bio || member.about || member.objective;

  if (!hasContent) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">About</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {member.bio && (
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Bio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>
        )}

        {member.about && (
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Details</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {member.about}
            </p>
          </div>
        )}

        {member.objective && (
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Objective</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {member.objective}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection;
