
export interface School{
    id: string;
        name: string;
        owner: string;
        status:string;
        yob: number;
        phone: number,
        email: string;
        website: string;
        imageLink:string;
        briefDesc: string;
        country: string;
        town: string;
        location: Coor[];
        tutorate: String[],

        fields: Field[]
}

export interface Coor {
    latitude: number;
    logitude: number

}

export interface Field{
    nameField: string;
    diplomat: string;
    branches: string[];
    duration: string;
    admission: string[];
    fees: Fee[]
}

export interface Fee{
    year: string;
    price: number;
}

     
