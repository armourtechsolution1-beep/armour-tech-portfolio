import { Project } from "@/lib/types"

interface projectDetailsProps{
    project:Project
}
export default function ProjectDetails(
   {project}:projectDetailsProps
){
    return(
        <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground text-balance">
              Project Details
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {project.details}
            </p>
          </div>
    )
}