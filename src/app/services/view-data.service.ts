import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ViewDataService {
    constructor(private http: HttpClient) {}

    // public baseUrl = environment.baseUrl;
     public baseUrl = "http://3.95.161.176:4000/";
   getViewData(
    governance_id:number,
    data:number,
    country_id:number,
    currentYear:number

   ): Observable<any> {
   
       return this.http.get(
        this.baseUrl + 'ndhs-master/view-detail/'+ governance_id + "/" + data + "/" + country_id + "/" + currentYear
        );
    }

}
