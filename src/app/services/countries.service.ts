import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    mapData = new Subject<any>();

    constructor(private http: HttpClient) {}

    // public baseUrl = environment.baseUrl;
     public baseUrl = "http://3.95.161.176:4000/";
   getCountries(): Observable<any> {
       return this.http.get(this.baseUrl + 'ndhs-master/countryList');
    }
}
