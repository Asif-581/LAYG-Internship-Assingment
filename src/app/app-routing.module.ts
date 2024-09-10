import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDetailComponent } from './home/country-detail/country-detail.component';
import { NoContentComponent } from './no-content/no-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    component: HomeComponent,
  },
  {
    path: 'country/:code',
    component: CountryDetailComponent,
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
