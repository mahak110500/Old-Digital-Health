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
        governance_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/governance-stats/' +
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
        return this.http.get(this.baseUrl + 'ndhs-master/country-list' );
    }

    //comparative-result details
    public getTopCountriesData(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.baseUrl + 'ndhs-master/top-countries', data);
    }

    public getTaxonomyTableData(data: any): Observable<any> {
        console.log(data);
        
        return this.http.post(this.baseUrl + 'ndhs-master/table-chart', data);
    }

    //api for getting BarChart Data
    public getChartData(data:any): Observable<any>{
        return this.http.post(this.baseUrl + 'ndhs-master/stats-graph', data);
    }


    // public getBarChartData(data: any): Observable<any> {
    //     // console.log(data);
    //     return this.http.post(this.baseUrl + '/ndhs-master/stats-graph', data);
        
    // }

    // public getBubbleChartData(data: any): Observable<any> {
    //     return this.http.post(this.baseUrl + 'ndhs-master/stats-graph', data);
    // }

    // public getRadarChartData(data: any): Observable<any> {
    //     return this.http.post(this.baseUrl + 'ndhs-master/stats-graph', data);
    // }
}