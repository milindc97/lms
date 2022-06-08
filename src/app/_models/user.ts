export class User {
    id: any; 
    email: any;
    salutation: any;
    firstName: any;
    lastName: any;
    mobile: any;
    dob:any;
    gender:any;
    roles:any;
    accessToken?: string;
    refreshToken?: string;
    rememberMe: boolean = false;
    lastLoginOn?: string;
}