import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyViewerComponent } from './property-viewer.component';

describe('PropertyViewerComponent', () => {
  let component: PropertyViewerComponent;
  let fixture: ComponentFixture<PropertyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ PropertyViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyViewerComponent);
    fixture.detectChanges();

  });


  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
