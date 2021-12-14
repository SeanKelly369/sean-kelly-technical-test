import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockdataService } from './mockdata.service';


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


  it('should return an Observable<Property>', () => {
    service.findAllProperties().subscribe( (properties: any) => {
      expect(service).toHaveBeenCalled();
    });
  })

});
