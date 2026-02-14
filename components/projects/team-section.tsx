import { Member } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TeamMember extends Member {
  role_on_project?: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  className?: string;
}

export function TeamSection({ teamMembers, className }: TeamSectionProps) {
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Team</h2>
        <p className="text-muted-foreground mt-1">People who worked on this project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <Link
            key={member.id}
            href={`/home/members/${member.id}`}
            className="group"
          >
            <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                {member.display_photo_url && (
                  <Image
                    src={member.display_photo_url}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {member.role}
                </p>
                {member.role_on_project && (
                  <p className="text-xs text-primary font-medium mt-1">
                    {member.role_on_project}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
