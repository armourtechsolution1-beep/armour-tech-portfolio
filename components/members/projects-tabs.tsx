'use client';

import { useState, useMemo } from 'react';
import { Project, OwnerType } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectsGrid } from './projects-grid';
import { cn } from '@/lib/utils';

interface ProjectsTabsProps {
  allProjects: Project[];
  memberId: string;
  className?: string;
}

export function ProjectsTabs({
  allProjects,
  memberId,
  className,
}: ProjectsTabsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const { personalProjects, teamProjects } = useMemo(() => {
    const personal = allProjects.filter(
      p => p.owner_id === memberId && p.owner_type === OwnerType.MEMBER
    );
    const team = allProjects.filter(
      p =>
        (p.owner_id !== memberId ||
          p.owner_type !== OwnerType.MEMBER) && p.owner_type === OwnerType.ORGANIZATION
    );
    return { personalProjects: personal, teamProjects: team };
  }, [allProjects, memberId]);

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <p className="text-muted-foreground mt-1">Personal and team contributions</p>
      </div>

      {personalProjects.length === 0 && teamProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects yet</p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All Projects
              <span className="ml-2 text-xs font-semibold">
                {allProjects.length}
              </span>
            </TabsTrigger>
            {personalProjects.length > 0 && (
              <TabsTrigger value="personal">
                Personal
                <span className="ml-2 text-xs font-semibold">
                  {personalProjects.length}
                </span>
              </TabsTrigger>
            )}
            {teamProjects.length > 0 && (
              <TabsTrigger value="team">
                Team
                <span className="ml-2 text-xs font-semibold">
                  {teamProjects.length}
                </span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ProjectsGrid projects={allProjects} />
          </TabsContent>

          {personalProjects.length > 0 && (
            <TabsContent value="personal" className="mt-6">
              <ProjectsGrid projects={personalProjects} />
            </TabsContent>
          )}

          {teamProjects.length > 0 && (
            <TabsContent value="team" className="mt-6">
              <ProjectsGrid projects={teamProjects} />
            </TabsContent>
          )}
        </Tabs>
      )}
    </section>
  );
}

export default ProjectsTabs;
