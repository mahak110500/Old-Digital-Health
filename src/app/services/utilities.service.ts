import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor(private http: HttpClient) {}

    showHeaderMenu = new Subject<boolean>();

    yearSource = new BehaviorSubject<string>('2021');
    currentYear = this.yearSource.asObservable();

    governanceTypeSource = new BehaviorSubject<any>('1');
    currentGovernanceType = this.governanceTypeSource.asObservable();

    countrySource = new BehaviorSubject<string>('44');
    currentCountry = this.countrySource.asObservable();


    changeYear(message: string) {
        this.yearSource.next(message);
    }

    changeGovernanceType(message:any) {
        this.governanceTypeSource.next(message);
    }

    changeCountryType(message:any) {
        this.countrySource.next(message);
    }
}
