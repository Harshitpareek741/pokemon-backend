export interface IContactForm extends Document {
    userId : string ; 
    artistId : string ; 
    name?: string;       // Optional
    email: string;       // Required
    phone: string;      // Optional
    subject: string;     // Required
    message: string;     // Required 
    createdAt?: Date;    
    updatedAt?: Date;    
  }