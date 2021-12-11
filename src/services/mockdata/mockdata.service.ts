import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Property } from 'src/interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  public URL: string = 'http://localhost:3000'

  public headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  public findAllProperties():  Observable<Property> {
    try {
      this.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      this.headers.set('Access-Control-Allow-Methods', 'GET')
      this.headers.set('Content-Type', 'application/json')
      const request = this.http.get<Property>(`${this.URL}/SearchResults`, {headers: this.headers, responseType: 'json'});
      request.subscribe( (response: Property) => {
        console.log(response);

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
}
