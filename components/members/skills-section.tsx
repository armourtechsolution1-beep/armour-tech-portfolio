import { Skill } from '@/lib/types';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}

export function SkillsSection({ skills, className }: SkillsSectionProps) {
  if (skills.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categories = Object.keys(skillsByCategory).sort();

  return (
    <section className={cn('space-y-8', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Skills & Expertise</h2>
        <p className="text-muted-foreground mt-1">Proficiency levels across different domains</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              {category}
            </h3>
            <div className="space-y-4">
              {skillsByCategory[category]
                .sort((a, b) => b.mastery_percentage - a.mastery_percentage)
                .map(skill => (
                  <div key={skill.id}>
                    <ProgressBar
                      label={skill.name}
                      percentage={skill.mastery_percentage}
                      showLabel={true}
                      color="bg-primary"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
