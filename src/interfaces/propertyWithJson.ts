export interface PropertyWithJson {
    propertyId: string;
    groupLogoUrl: string;
    bedsString?: string;
    bedNumber?: number;
    price: string;
    sizeStringMeters: number;
    displayAddress: string;
    propertyType: string;
    bathString?: string;
    bathNumber?: number;
    berRating?: string;
    mainPhoto: string;
    photos: Array<string>;
    rawJson: string;
    size: string;
}