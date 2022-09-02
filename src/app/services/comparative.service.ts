import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
// import { Comparative } from '../models/countries';

export interface Comparative {
    success: boolean;
    data: [{ 
        countries: any; 
        developmentId: any; 
        year: any;
    }];
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ComparativeService {
    constructor(private http: HttpClient) {}

    // public baseUrl = environment.baseUrl;
     public baseUrl = "http://3.95.161.176:4000/";
   getComparative(data:any): Observable<any>{
       return this.http.post(this.baseUrl + 'ndhs-master/comparative',data);
    }
    getDefault(data:any): Observable<any>{
        return this.http.post(this.baseUrl + 'ndhs-master/default-country',data);
     }
}
