import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockdataService } from './mockdata.service';

describe('MockdataService', () => {
  let injector: TestBed;
  let service: MockdataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockdataService]
    });
    service = TestBed.get(MockdataService);
  });

  injector = getTestBed();
  service = TestBed.get(MockdataService);
  httpMock = TestBed.get(HttpTestingController);

  afterEach(() => {
    httpMock.verify();
  })

  it('should return an Observable<any>', () => {
    service.findAllProperties().subscribe( (properties: any) => {
      console.log(properties);
      expect(properties).toBeTruthy('No courses returned');
    })
  })


});
