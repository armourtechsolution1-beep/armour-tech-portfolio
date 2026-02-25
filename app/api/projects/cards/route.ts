import { supabase } from "@/lib/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(){
    
    try{
        const {data,error}=await supabase.rpc('get_project_card')
        // if(data) console.log("Supabase Data:" ,data)
        if(error) console.log("Supabase Error: ",error)
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.json(
            { 
                error:`Failed To fetch Card Data with error:${error}`
            } ,
            {
            status:500
            }
        )
    }
}