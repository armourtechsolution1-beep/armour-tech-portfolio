import { Member } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MemberHeroProps {
  member: Member;
  className?: string;
}

export function MemberHero({ member, className }: MemberHeroProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Cover photo */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        {member.cover_photo_url && (
          <Image
            src={member.cover_photo_url}
            alt={`${member.name}'s cover`}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Profile info overlay */}
      <div className="relative px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20 pb-8">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg border-4 border-background overflow-hidden bg-card flex-shrink-0">
            {member.display_photo_url && (
              <Image
                src={member.display_photo_url}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Text info */}
          <div className="flex-1 pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {member.name}
            </h1>
            <p className="text-lg text-muted-foreground font-medium">{member.role}</p>
            {member.objective && (
              <p className="text-sm text-foreground mt-2 max-w-2xl">
                {member.objective}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberHero;
