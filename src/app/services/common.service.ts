import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class CommonService{
    constructor(private http: HttpClient) {}

    public baseUrl = environment.baseUrl;

    public getNdhsCountriesDetails(
        governance_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/details/' +
                governance_id +
                '/' +
                country_id +
                '/' +
                year
        );
        //return this.http.get<any>('./assets/data/countries.json');
    }
    
    //api for getting all the countries
    public getAllCountries(): Observable<any> {
        return this.http.get(this.baseUrl + 'ndhs-master/existed-countries-list' );
    }

    //api for getting BarChart Data
    public getBarChartData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/bar-chart', data);
    }

    public getBubbleChartData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/bubble-chart', data);
    }
}