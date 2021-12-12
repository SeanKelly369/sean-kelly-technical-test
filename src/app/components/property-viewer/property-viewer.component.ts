import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockdataService } from 'src/services/mockdata/mockdata.service';
import { Property } from '../../../interfaces/property';

@Component({
  selector: 'app-property-viewer',
  templateUrl: './property-viewer.component.html',
  styleUrls: ['./property-viewer.component.scss']
})
export class PropertyViewerComponent implements OnInit {

  public filterSearchForm = new FormGroup({
    minPrice: new FormControl(''),
    maxPrice: new FormControl('')
  })

  public allProperties: Array<Property> = [];
  public numberOfBeds: number = 0;
  public numberOfBaths: number = 0;
  public minPriceOptions: string[] = ['€150,000', '€200,000', '€250,000', '€300,000', '€350,000'];
  public maxPriceOptions: string[] = ['€450,000', '€400,000', '€350,000', '€300,000', '€250,000'];

  constructor(
    public mockDataService: MockdataService,
    private formBuilder: FormBuilder
  ) { 
    this.filterSearchForm = this.formBuilder.group({
      minPrice: [ '' , Validators.requiredTrue],
      maxPrice: ['']
    })
  }

  public ngOnInit(): void {
    this.mockDataService.findAllProperties().subscribe( (data: any) => {
      this.allProperties = data;
      console.log(this.allProperties);
      this.numberOfBeds = this.mockDataService.highLightedProperty
      .bedsString?.toString().split(' ')[0] as unknown as number;
      console.log(this.mockDataService.highLightedProperty.bedsString?.toString().split(' ')[0]);
      
      if(this.mockDataService.highLightedProperty.bathString !== undefined) {
        this.numberOfBaths = this.mockDataService.highLightedProperty
        .bathString?.toString().split(' ')[0] as unknown as number;
      } 
   
    })
  }

  public selectProperty(selectedProperty: any) {
    console.log(selectedProperty);
    this.mockDataService.selectedProperty = selectedProperty;
    this.mockDataService.highLightedProperty.price = selectedProperty.Price;
    this.mockDataService.highLightedProperty.bathString = selectedProperty.BathString;
    if(selectedProperty.BathString === undefined || selectedProperty.BathString === null || selectedProperty.BathString === '') {
      this.numberOfBaths = 0;
      console.log(selectedProperty.BathString);
    }else {
      this.numberOfBaths = selectedProperty.BathString.toString().split(' ')[0].trim();
    }
    this.mockDataService.highLightedProperty.propertyId = selectedProperty.PropertyId;
    
    this.mockDataService.highLightedProperty.berRating = selectedProperty.BerRating;
    this.mockDataService.highLightedProperty.bedsString = selectedProperty.BedsString;
    
    
    if(selectedProperty.BedsString !== undefined || selectedProperty.BedsString !== null || selectedProperty.BedsString !== '') {
      this.numberOfBeds = selectedProperty.BedsString.toString().split(' ')[0].trim();
    } else {
      this.numberOfBeds = 0;
    }
    
    this.mockDataService.highLightedProperty.groupLogoUrl = selectedProperty.GroupLogoUrl;
    this.mockDataService.highLightedProperty.mainPhoto = selectedProperty.MainPhoto;

    this.mockDataService.highLightedProperty.photos = selectedProperty.Photos;
    this.mockDataService.highLightedProperty.displayAddress = selectedProperty.DisplayAddress;

    if(selectedProperty.Price !== (null || undefined || '' || 'POA') ) {
      this.mockDataService.highLightedProperty.price = selectedProperty.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      this.mockDataService.highLightedProperty.price = ' ' + selectedProperty.Price;
    }
  }

  public filterByWithinPriceRange() {
    this.mockDataService.findPropertiesByWithinPriceRange(300000, 420000)
    .subscribe(( data : any) => {
      console.log(data);
    })
  }

  public filterSearch() {

  }

}
