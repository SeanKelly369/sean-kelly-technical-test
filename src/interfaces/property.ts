export interface Property {
    propertyId: string;
    groupLogoUrl: string;
    bedsString: string;
    price: any;
    sizeStringMeters: number;
    displayAddress: string;
    propertyType: string;
    bathRating?: string;
    berRating?: string;
    mainPhoto: string;
    photos: Array<string>;

}