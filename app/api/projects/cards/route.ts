import { cardData } from "@/lib/card-mock";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        return NextResponse.json(cardData)
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