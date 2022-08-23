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


    // public getExistedCountries(data: any): Observable<any> {       
    //     let selected_years = JSON.parse(localStorage.getItem("selected_years") || "")
    //     if(selected_years && selected_years.length == 2){
    //         return this.http.get(this.baseUrl + 'ndhs-master/existed-countries-list' );
    //     }else{
    //         return this.http.post(
    //             this.baseUrl + 'ndhs-master/existed-countries-list',
    //             data
    //         );
    //     }        
    // }

    public getAllCountries(): Observable<any> {
        return this.http.get(this.baseUrl + 'ndhs-master/existed-countries-list' );
    }
}