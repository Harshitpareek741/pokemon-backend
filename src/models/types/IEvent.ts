
export interface IEvent extends Document {
    image: string;
    image1?: string ; 
    image2?: string ; 
    fees : string ; 
    title: string;
    date: Date;
    Location: string;
    city: string;
    time: string;
    description: string;
    type: string;
    capacity: number;
    genere: string;
}