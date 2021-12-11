import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Property } from 'src/interfaces/property';
import { PropertyWithJson } from 'src/interfaces/propertyWithJson';


@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  public URL: string = 'http://localhost:3000'

  public headers = new HttpHeaders();

  public allProperties: Array<Property> = [];
  public highLightedProperty: PropertyWithJson = {
    propertyId: '',
    groupLogoUrl: '',
    bedsString: '',
    price: '',
    sizeStringMeters: 0,
    displayAddress: '',
    propertyType: '',
    bathRating: '',
    berRating: '',
    mainPhoto: '',
    photos: [],
    rawJson: ''

  };

  constructor(private http: HttpClient) { }

  public findAllProperties():  Observable<Property> {
    try {
      this.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      this.headers.set('Access-Control-Allow-Methods', 'GET')
      this.headers.set('Content-Type', 'application/json')
      const request = this.http.get<Property>(`${this.URL}/SearchResults`, {headers: this.headers, responseType: 'json'});
      request.subscribe( (response: any) => {
        this.allProperties = response;
        const firstProperty = this.allProperties[0];

        // when initiating first API call, use first property object
        this.highLightedProperty = this.updateHighlightedProperty(firstProperty);
        console.log(this.highLightedProperty);
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
    this.highLightedProperty.bedsString = firstProperty.BedsString;
    this.highLightedProperty.price = firstProperty.Price;
    this.highLightedProperty.sizeStringMeters = firstProperty.SizeStringMeters;
    this.highLightedProperty.displayAddress = firstProperty.DisplayAddress;
    this.highLightedProperty.propertyType = firstProperty.PropertyType;
    this.highLightedProperty.bathRating = firstProperty.BathRating;
    this.highLightedProperty.mainPhoto = firstProperty.MainPhoto;
    this.highLightedProperty.photos = firstProperty.Photos;
    this.highLightedProperty.rawJson = firstProperty as unknown as string;

    return this.highLightedProperty;
  }
}
