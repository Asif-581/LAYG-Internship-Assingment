import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../model/country';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  constructor() {}

  ngOnInit(): void {}
}
