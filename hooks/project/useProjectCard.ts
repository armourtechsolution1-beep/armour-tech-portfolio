import { OrgProjectCard } from "@/lib/card-utils"
import { useQuery } from "@tanstack/react-query";

export const useProjectCard=()=>{

    const getProjectCard=async()=>{
        try{
            const res= await fetch("/api/projects/cards",{
            headers:{
                Accept:"application/json",
            },
            method:"GET"
        });
        if (res.ok){
            const data:OrgProjectCard[]=await res.json();
            return data
        }

        }
        catch(e){
            console.log(e);
        }
       
    }
    const projectData= useQuery({
        queryKey:['OrgProjectCards'],
        queryFn:()=>getProjectCard(),
    })
return{
    filteredProjects:projectData.data??[],
    loading:projectData.isLoading,
}
}