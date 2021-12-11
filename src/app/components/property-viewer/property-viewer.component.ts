import { Component, OnInit } from '@angular/core';
import { MockdataService } from 'src/services/mockdata/mockdata.service';

@Component({
  selector: 'app-property-viewer',
  templateUrl: './property-viewer.component.html',
  styleUrls: ['./property-viewer.component.scss']
})
export class PropertyViewerComponent implements OnInit {

  public temp: any;
  constructor(public mockDataService: MockdataService) { }

  ngOnInit(): void {
    this.temp = this.mockDataService.findAllProperties();
    console.log(this.temp);
  }

}
