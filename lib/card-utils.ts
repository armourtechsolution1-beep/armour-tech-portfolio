
import {
  Smartphone,
  Globe,
  Apple,
  Monitor,
  Layers,
  Terminal,
  Gamepad2,
  BookOpen,
  type LucideIcon
} from "lucide-react"
export type ProjectType ='android'|
    'web'|
    'ios'|
    'windows'|
    'cross_platform'|
    'command_line'|
    'gaming'|
    'library'
export interface OrgProjectCard {
    project_id: string;
    project_name: string;
    display_photo_url:string;
    project_type:ProjectType;
    date_completed: string | null;
    project_description:string;

}
export const IconProjectTypeMap:Record<ProjectType,{icon:LucideIcon,label:String}>={
    'android':{icon:Smartphone,label:"Android App"},
    'web':{icon:Globe,label:"Web App"},
    'ios':{icon:Apple,label:"ios App"},
    'windows':{icon:Monitor,label:"Desktop App"},
    'cross_platform':{icon:Layers,label:"Cross Platform"},
    'command_line':{icon:Terminal,label:"CMD terminal app"},
    'gaming':{icon:Gamepad2,label:"Gaming App"},
    'library':{icon:BookOpen,label:"App Library"},
}
export const showMoreWords=(content:string,maxChars:number):string=>{
    let defaultnumber:number=60;
    if(maxChars){
        defaultnumber=maxChars
    }
    const contentlength:number=content.length
    if (contentlength<defaultnumber)return content
    return `${content.slice(0,defaultnumber-1)}...more`
}
