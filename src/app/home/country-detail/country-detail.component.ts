import { Component, OnInit } from '@angular/core';
import { CountryListService } from '../country-list/country-list.service';
import { Country } from '../model/country';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  country!: Country;
  countryCode!: string;
  isLoading: boolean = true;
  countryBorder!: { name: string|undefined; alpha3Code:string }[];

  constructor(
    private countryService: CountryListService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.countryCode = param.get('code')!;
      this.getCountry(this.countryCode);
    });
  }

  ngOnInit(): void {
    this.getCountry(this.countryCode);
  }

  private getCountry(code: string) {
    this.countryService.getCountry(code)
      .pipe(
        switchMap(country => {
          this.country = country;
          return this.countryService
         .getBorderName(this.country.borders)
        })
      )
      .subscribe((data) => {
        this.countryBorder = data
        this.isLoading = false;
    });
  }

  onBorderClick(border: string) {
    this.route.navigate([`country/${border}`]);
  }
}
