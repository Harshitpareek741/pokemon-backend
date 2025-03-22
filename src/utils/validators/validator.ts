export const validateFields = (data: any, requiredFields: string[]): string | null => {
    for (const field of requiredFields) {
      if (!data[field]) {
        return field;
      }
    }
    return null;
  };
  
  export const artistRequiredFields = [ 
    'username',
    'email',
    'password',
    'city',
    'state',
    'country',
    'pincode',
    'phoneNumber',
    'tag',
    'bio',
    'videoLink1',
    'instagram',
     'role'
  ];
  
  export const userRequiredFields = [
    'username',
    'email',
    'password',
    'role'
  ];
  

export const mandatoryFieldsForTeam = [
  'name',
  'description',
  'members'
];

export const madatoryFieldsforTeamMemberToJoin = [
  'teamId',
  'userId'
];


export const contactFormFields = [
  "userId" , 
  "artistId",
  "name",
  "email",
  "phone",
  "subject",
  "message",
];

export const bookFreeEventFields = [
  "userId" , 
  "eventId"
]
export const reviewValidationFields = ["artistId", "userId", "reviewDescription", "rating"];

export const ratingValidationFields = ["ratingCount", "rating"];

export const savedArtistFields = ["userId" , "artistId"];
