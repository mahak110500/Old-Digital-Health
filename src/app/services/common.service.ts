import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class CommonService{
    constructor(private http: HttpClient) {}

    public baseUrl = "http://3.95.161.176:4000/";

    public getNdhsCountriesDetails(
        
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/governance-stats/1/14/2021'
        );
        //return this.http.get<any>('./assets/data/countries.json');
    }
    
    //api for getting all the countries
    public getAllCountries(): Observable<any> {
        return this.http.get(this.baseUrl + 'ndhs-master/country-list' );
    }

    //comparative-result details
    public getTopCountriesData(data: any): Observable<any> {
        console.log(data);
        
        return this.http.post(this.baseUrl + 'ndhs-master/top-countries', data);
    }

    public getTaxonomyTableData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/table-chart', data);
    }

    //api for getting BarChart Data
    public getBarChartData(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.baseUrl + '/ndhs-master/bar-chart', data);
    }

    public getBubbleChartData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/bubble-chart', data);
    }

    public getRadarChartData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/radar-chart', data);
    }
}