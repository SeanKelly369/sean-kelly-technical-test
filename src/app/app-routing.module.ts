import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrochureComponent } from './components/brochure/brochure.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PropertyViewerComponent } from './components/property-viewer/property-viewer.component';

const routes: Routes = [

  { path: 'property', component:  PropertyViewerComponent},
  { path: 'brochure', component: BrochureComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', redirectTo: 'property', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
