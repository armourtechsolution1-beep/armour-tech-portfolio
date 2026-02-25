import { OrgProjectCard } from "@/lib/card-utils"
import { supabase } from "@/lib/supabase/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useProjectCard=()=>{
const queryClient=useQueryClient();
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
    useEffect(()=>{
        const channel =supabase.channel('org_project_channel').on('postgres_changes',{event:'*',schema:'public',table:'OrganizationProject'},()=>{
            queryClient.invalidateQueries({queryKey:['OrgProjectCards']})
        }).subscribe()
        return()=>{
            supabase.removeChannel(channel)
        }
    },[queryClient])

return{
    filteredProjects:projectData.data??[],
    loading:projectData.isLoading,
}
}