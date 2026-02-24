export interface OrgProjectCard {
    id: String
    proj_name: string
    display_photo_url:String
    project_type: 'android'|
    'web'|
    'ios'|
    'windows'|
    'cross_platform'|
    'command_line'|
    'gaming'|
    'library'
    date_completed: Date
    project_description:String

}