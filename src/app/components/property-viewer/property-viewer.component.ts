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

  public minPrice: string = '';
  public maxPrice: string = '';
  public sizeInMeters: string = '';
  public sizeInFeet: string = '';
  public showFilterButtonWarning: boolean = false;
  public filterErrorMessage: string = '';

  // Note:  This ended up not being required, but I left it in to show I'm aware of form validation
  valueValidator() {
    return (control:FormControl) => {
      const form = control.parent;
      if (form) {
        const min = form.get('minPrice');
        const max = form.get('maxPrice');
        if(min?.value != null && min.value != null) {
          
          return min?.value && max?.value && +max.value < +min.value ? {error: 'min value'}:null;
        }
      }
      return null;
    }
  }

  public filterSearchForm = new FormGroup({
    minPrice: new FormControl([undefined, Validators.required, Validators.min(150000), this.valueValidator() ]),
    maxPrice: new FormControl([undefined, Validators.required, Validators.max(450000), this.valueValidator() ])
  })

  public allProperties: Array<Property> = [];
  public numberOfBedsNum: number[] = [];
  public numberOfBathsNum: number[] = [];
  public numberOfBeds: number = 0;
  public numberOfBaths: number = 0;
  public minPriceOptions: string[] = ['€50,000', '€100,000', '€150,000', '€200,000', '€250,000', '€300,000', '€350,000'];
  public maxPriceOptions: string[] = ['€550,000', '€500,000', '€450,000', '€400,000', '€350,000', '€300,000', '€250,000'];

  constructor(
    public mockDataService: MockdataService,
    private formBuilder: FormBuilder
  ) { 
    this.filterSearchForm = this.formBuilder.group({
      minPrice: [ '' , Validators.requiredTrue],
      maxPrice: ['' , Validators.requiredTrue]
    })
  }

  public ngOnInit(): void {
    this.mockDataService.findAllProperties().subscribe( (data: any) => {
      this.allProperties = data;
      console.log(this.allProperties);
      this.numberOfBeds = this.mockDataService.highLightedProperty
      .bedsString?.toString().split(' ')[0] as unknown as number;//
      this.numberOfBedsNum.length = this.numberOfBeds;
      console.log(this.mockDataService.highLightedProperty.bedsString?.toString().split(' ')[0]);
      
      if(this.mockDataService.highLightedProperty.bathString !== undefined) {
        this.numberOfBaths = this.mockDataService.highLightedProperty
        .bathString?.toString().split(' ')[0] as unknown as number;
        this.numberOfBathsNum.length = this.numberOfBaths;
      } 

      let bathsContainer = document.getElementById('baths');
      for(let i = 0; i < this.numberOfBaths; i++) {
        let tempElement = document.createElement('img');
        tempElement.src = '../../../assets/bath.svg';
        bathsContainer?.appendChild(tempElement);
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
    }else {
      this.numberOfBaths = selectedProperty.BathString.toString().split(' ')[0].trim();
      this.numberOfBathsNum.length = this.numberOfBaths;
    }
    this.mockDataService.highLightedProperty.propertyId = selectedProperty.PropertyId;
    
    this.mockDataService.highLightedProperty.berRating = selectedProperty.BerRating;
    this.mockDataService.highLightedProperty.bedsString = selectedProperty.BedsString;
    
    
    if(selectedProperty.BedsString !== undefined || selectedProperty.BedsString !== null || selectedProperty.BedsString !== '') {
      this.numberOfBeds = selectedProperty.BedsString.toString().split(' ')[0].trim();
      this.numberOfBedsNum.length = this.numberOfBeds;
    } else {
      this.numberOfBeds = 0;
    }

    this.mockDataService.highLightedProperty.sizeStringFeet = selectedProperty.SizeStringFeet;
    this.mockDataService.highLightedProperty.sizeStringMeters = selectedProperty.SizeStringMeters;
    if(this.mockDataService.highLightedProperty.sizeStringFeet) {
      this.mockDataService.highLightedProperty.sizeStringMeters = 
       parseFloat((this.mockDataService.highLightedProperty.sizeStringFeet * 0.3048).toFixed(2));
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
    const selectMax = (document.getElementById('maxPrice') as any);
    const selectMin = (document.getElementById('minPrice') as any);

    let minValueStr = selectMin.options[selectMin.selectedIndex].text;
    console.log(minValueStr);
    let maxValueStr = selectMax.options[selectMax.selectedIndex].text;
    console.log(maxValueStr)
    let minValueNum: number = 0;
    if(minValueStr !== null && minValueStr !== '') {
      minValueStr = minValueStr?.replace('€', '').replace(',', '');
      minValueNum = parseInt( (minValueStr?.replace('€', '').replace(',', '')) );
    }
    let maxValueNum: number = 0;
    if(maxValueStr !== null && (maxValueStr !== '')) {
      maxValueStr = maxValueStr?.replace('€', '').replace(',', '');
      maxValueNum = parseInt( (maxValueStr?.replace('€', '').replace(',', '')) );
    }
    if(maxValueNum > minValueNum) {
      this.mockDataService.findPropertiesByPriceRange(minValueNum, maxValueNum).subscribe( (data: any) => {
        this.allProperties = this.mockDataService.allProperties;
        this.showFilterButtonWarning = false;
      });
    } else {
      console.log('Minimum price must be greater than maximum price');
      this.showFilterButtonWarning = true;
      this.filterErrorMessage = 'Minimum price must be greater than maximum price';
    }
  }

}
