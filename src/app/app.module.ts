import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyViewerComponent } from './components/property-viewer/property-viewer.component';
import { StringSplitPipe } from '../app/pipes/string-split.pipe';
import { BrokenImageDirective } from './directives/broken-image.directive';
import { BrochureComponent } from './components/brochure/brochure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyViewerComponent,
    StringSplitPipe,
    BrokenImageDirective,
    BrochureComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
