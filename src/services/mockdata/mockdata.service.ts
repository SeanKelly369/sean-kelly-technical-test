import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Property } from 'src/interfaces/property';
import { PropertyWithJson } from 'src/interfaces/propertyWithJson';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  public URL: string = 'http://localhost:3000'

  public headers = new HttpHeaders();

  public selectedProperty: any = 0;
  public allProperties: Array<Property> = [];
  public highLightedProperty: PropertyWithJson = {
    propertyId: '',
    groupLogoUrl: '',
    bedsString: '',
    bedNumber: 0,
    price: '',
    sizeStringMeters: 0,
    sizeStringFeet: 0,
    displayAddress: '',
    propertyType: '',
    bathString: '',
    bathNumber: 0,
    berRating: '',
    mainPhoto: '',
    photos: [],
    size: '',
    rawJson: ''
  };

  constructor(private http: HttpClient) { }

  public setHeaders(): void {
    this.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    this.headers.set('Access-Control-Allow-Methods', 'GET')
    this.headers.set('Content-Type', 'application/json')
  }

  public updateProperties(response: any) {
    this.allProperties = response;
    const firstProperty = this.allProperties[0];
    this.selectedProperty = this.allProperties[0];
    this.highLightedProperty = this.updateHighlightedProperty(firstProperty);
    return this.highLightedProperty;
  }

  public findAllProperties():  Observable<Property> {
    try {
      this.setHeaders();
      const request = this.http.get<Property>(`${this.URL}/SearchResults`, {headers: this.headers, responseType: 'json'});
      request.subscribe( (response: any) => {
        this.updateProperties(response);
      })
      return request;
    } catch(error) {
      console.error(error);
      return EMPTY;
    }
  }


  // Filter results under specified price
  public findPropertiesByPriceRange(minPrice: number, maxPrice: number): any {
    try {
      this.setHeaders();
      const request = this.http.get<any>(`${this.URL}/SearchResults`,
      {headers: this.headers, responseType: 'json'});
      request.pipe(map(data => data
        .filter( (f: Property) => f.Price >= minPrice && f.Price <= maxPrice)))
      .subscribe( (response: any) => {
        this.updateProperties(response);
        return response;
      })
      return request;
    } catch(error) {
      console.error(error);
      return EMPTY;
    }
  }

  public findPropertyById(propertyId: number): Observable<Property> { 
    return this.http.get<Property>(`${URL}/${propertyId}`)
  }

  public updateHighlightedProperty(firstProperty: any) {
    this.highLightedProperty.propertyId = firstProperty.PropertyId;
    this.highLightedProperty.groupLogoUrl = firstProperty.GroupLogoUrl;
    this.highLightedProperty.displayAddress = firstProperty.DisplayAddress;
    this.highLightedProperty.berRating = firstProperty.BerRating;
    this.highLightedProperty.bedsString = firstProperty.BedsString;
    if(firstProperty.Price !== (null || undefined || '' || 'POA') ) {
      this.highLightedProperty.price = firstProperty.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      this.highLightedProperty.price = firstProperty.Price;
    }
    this.highLightedProperty.sizeStringMeters = firstProperty.SizeStringMeters;
    this.highLightedProperty.displayAddress = firstProperty.DisplayAddress;
    this.highLightedProperty.propertyType = firstProperty.PropertyType;
    this.highLightedProperty.bathString = firstProperty.BathString;
    this.highLightedProperty.mainPhoto = firstProperty.MainPhoto;
    this.highLightedProperty.photos = firstProperty.Photos;
    this.highLightedProperty.size = firstProperty.SizeStringMeters;
    this.highLightedProperty.rawJson = firstProperty as unknown as string;

    return this.highLightedProperty;
  }
}
