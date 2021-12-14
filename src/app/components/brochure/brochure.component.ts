import { Component, OnInit } from '@angular/core';
import { MockdataService } from 'src/services/mockdata/mockdata.service';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit {

  constructor(public mockDataService: MockdataService) { }

  ngOnInit(): void {
    this.mockDataService.selectedProperty;
  }

}
