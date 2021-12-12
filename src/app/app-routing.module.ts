import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrochureComponent } from './components/brochure/brochure.component';
import { PropertyViewerComponent } from './components/property-viewer/property-viewer.component';

const routes: Routes = [

  { path: 'home', component: PropertyViewerComponent },
  { path: 'brochure', component: BrochureComponent },
  { path: '', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
