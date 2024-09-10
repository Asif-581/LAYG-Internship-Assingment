import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '../model/country';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  searchControl = new FormControl<string | null>(null);
  regionControl = new FormControl<string>('All');
  @Output() selectedRegion = new EventEmitter<string>();
  @Output() searchedValue = new EventEmitter<string | null>();
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const queryParams = params as QueryParams;
      if (queryParams?.name) {
        this.searchControl.setValue(queryParams?.name);
      } else {
        this.searchControl.setValue(null);
      }
      if (queryParams?.region) {
        this.regionControl.setValue(queryParams?.region);
      } else {
        this.regionControl.setValue('All');
      }
    });
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.regionControl.valueChanges.subscribe((value) =>
      this.selectedRegion.emit(value!)
    );
    this.searchControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => this.searchedValue.emit(value));
  }
}
