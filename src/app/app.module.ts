import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyViewerComponent } from './components/property-viewer/property-viewer.component';
import { StringSplitPipe } from '../app/pipes/string-split.pipe';
import { BrokenImageDirective } from './directives/broken-image.directive';
import { BrochureComponent } from './components/brochure/brochure.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyViewerComponent,
    StringSplitPipe,
    BrokenImageDirective,
    BrochureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
