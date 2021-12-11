import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockdataService } from './mockdata.service';
import { Property } from '../../interfaces/property';

describe('MockdataService', () => {
  let injector: TestBed;
  let service: MockdataService;
  let httpMock: HttpTestingController;
  
  beforeEach( async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockdataService]
    });
    service = await TestBed.get(MockdataService);
    injector = getTestBed();
    service = TestBed.get(MockdataService);
    httpMock = TestBed.get(HttpTestingController);
  });


  // afterEach(() => {
  //   httpMock.verify();
  // })

  it('should return an Observable<Property>', () => {
    service.findAllProperties().subscribe( (properties: any) => {
      console.log(properties)
      console.log(properties[0])
      console.log(properties[0].bedString)
      expect(service).toHaveBeenCalled();
      // expect(service.cancelled).toBeFalsy();
      // expect(service.request.responseType).toEqual('json');
    });
    // const req = httpMock.expectOne(service.URL + '/SearchResults');

  })


});
