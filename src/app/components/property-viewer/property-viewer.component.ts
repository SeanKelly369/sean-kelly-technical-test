import { Component, OnInit } from '@angular/core';
import { MockdataService } from 'src/services/mockdata/mockdata.service';
import { Property } from '../../../interfaces/property';

@Component({
  selector: 'app-property-viewer',
  templateUrl: './property-viewer.component.html',
  styleUrls: ['./property-viewer.component.scss']
})
export class PropertyViewerComponent implements OnInit {

  public temp: Array<Property> = [];
  constructor(public mockDataService: MockdataService) { }

  ngOnInit(): void {
    this.mockDataService.findAllProperties().subscribe( (data: any) => {
      this.temp = data;
      console.log(this.temp);
    })
  }

}
