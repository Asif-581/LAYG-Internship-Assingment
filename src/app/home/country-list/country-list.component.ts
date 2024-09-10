import { Component, OnInit } from '@angular/core';
import { CountryListService } from './country-list.service';
import { Country, QueryParams } from '../model/country';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  isLoading: Boolean = true;
  selectedRegion!: QueryParams;
  constructor(
    private countryListService: CountryListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedRegion = params as QueryParams;
      this.filterCountries(this.selectedRegion);
    });
  }

  filterCountries(queryParams: QueryParams) {
    this.isLoading = true;
    this.countryListService.getCountries(queryParams).subscribe((data) => {
      this.countries = data;
      this.isLoading = false;
    });
  }

  searchedValueEventHandler(searchedValue: string | null) {
    if (!searchedValue) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { ...this.selectedRegion, name: null },
        queryParamsHandling: 'merge',
      });
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.selectedRegion, name: searchedValue },
      queryParamsHandling: 'merge',
    });
  }

  selectedRegionEventHandler(selectedRegion: string) {
    if (selectedRegion === 'All') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { ...this.selectedRegion, region: null },
        queryParamsHandling: 'merge',
      });
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.selectedRegion, region: selectedRegion },
      queryParamsHandling: 'merge',
    });
  }
}
