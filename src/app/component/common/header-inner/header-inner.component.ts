import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-inner',
    templateUrl: './header-inner.component.html',
    styleUrls: ['./header-inner.component.css'],
})
export class HeaderInnerComponent implements OnInit {

    routeSubscription: any;
    currentRoute: any;
    showHeaderMenu: boolean = false;

    governance_id:any;

    constructor(){}
    
    ngOnInit(): void {

       
       
    }
}
