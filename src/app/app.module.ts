import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CountryCardComponent } from './home/country-card/country-card.component';
import { CountryDetailComponent } from './home/country-detail/country-detail.component';
import { CountryListComponent } from './home/country-list/country-list.component';
import { FilterComponent } from './home/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    NavbarComponent,
    NoContentComponent,
    CountryCardComponent,
    CountryDetailComponent,
    CountryListComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
