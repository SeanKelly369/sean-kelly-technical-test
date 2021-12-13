import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrochureComponent } from './components/brochure/brochure.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PropertyViewerComponent } from './components/property-viewer/property-viewer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'property', component:  PropertyViewerComponent, data: {animationState: 'property'} },
      { path: 'brochure', component: BrochureComponent, data: {animationState: 'brochure'} },
      { path: 'gallery', component: GalleryComponent, data: {animationState: 'gallery'} },
      { path: '', redirectTo: 'property', pathMatch: 'full' }
    ]
    
  },
  { path: '**', redirectTo: 'property', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
