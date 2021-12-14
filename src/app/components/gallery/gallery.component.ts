import { Component, OnInit } from '@angular/core';
import { MockdataService } from 'src/services/mockdata/mockdata.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public gallery:string[] = [];

  constructor(public mockDataService: MockdataService) { }

  ngOnInit(): void {
    this.gallery = this.mockDataService.highLightedProperty.photos;
  }

}
