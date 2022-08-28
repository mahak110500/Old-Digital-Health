// http://3.95.161.176:4000/ndhs-master/comparative
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ComparativeService {
    constructor(private http: HttpClient) {}

    // public baseUrl = environment.baseUrl;
     public baseUrl = "http://3.95.161.176:4000/";
   getComparative(): Observable<any> {
       return this.http.get(this.baseUrl + 'ndhs-master/comparative');
    }
}
