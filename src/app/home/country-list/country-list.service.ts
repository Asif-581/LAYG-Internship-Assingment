import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, QueryParams } from '../model/country';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  private dataUrl = 'assets/data.json';
  constructor(private http: HttpClient) {}

  getCountries(queryParams: QueryParams): Observable<Country[]> {
    if (queryParams?.name && queryParams?.region) {
      return this.http.get<Country[]>(this.dataUrl).pipe(
        map((countries) => {
          return countries.filter((country) => {
            return (
              country.name
                ?.toLocaleLowerCase()
                .startsWith(queryParams.name!.toLocaleLowerCase()) &&
              country.region === queryParams.region
            );
          });
        })
      );
    }
    if (queryParams?.name) {
      return this.http
        .get<Country[]>(this.dataUrl)
        .pipe(
          map((countries) =>
            countries.filter((country) =>
              country.name
                ?.toLocaleLowerCase()
                .startsWith(queryParams.name!.toLocaleLowerCase())
            )
          )
        );
    }
    if (queryParams?.region) {
      return this.http
        .get<Country[]>(this.dataUrl)
        .pipe(
          map((countries) =>
            countries.filter(
              (country) => country.region === queryParams?.region
            )
          )
        );
    }
    return this.http.get<Country[]>(this.dataUrl);
  }

  getCountry(code: string) {
    return this.http.get<Country[]>(this.dataUrl).pipe(
      map((countries) =>
        countries.filter((country) => country.alpha3Code === code)
      ),
      map((countries) => {
        return countries.map((country) => ({
            ...country,
            topLevelDomainCommaSeperated:country.topLevelDomain?.map((c)=> c).join(' , '),
          currencyCommaSeperated: country.currencies
            ?.map((c) => c.name)
            .join(' , '),
          languageCommaSeprated: country.languages
            ?.map((c) => c.name)
            .join(' , '),
        }));
      }),
      map((countries) => countries[0])
    );
    }
    
    getBorderName(borders:string[]) {
        return this.http.get<Country[]>(this.dataUrl).pipe(
            map(countries => countries.filter((country) => borders?.includes(country.alpha3Code))
                .map((countries) => {
                    return {
                        name:countries.name,
                        alpha3Code:countries.alpha3Code
                    }
                }))
        );
    }
}
