import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

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

    constructor(private utilities: UtilitiesService){}
    
    ngOnInit(): void {
        if(localStorage.getItem('governance_id') == null) {
            localStorage.setItem('governance_id', JSON.stringify(1));
        }

        this.governance_id = localStorage.getItem('governance_id');

        this.utilities.showHeaderMenu.subscribe((result) => {
            this.showHeaderMenu = result;
        });
        this.utilities.governanceTypeSource.subscribe((result) => {
            this.governance_id = result;
        });
    }

    dropDown2() {
        $('.toggleSubmenu2').next('ul').toggleClass('show');
    }
    dropDown1() {
        $('.toggleSubmenu1').next('ul').toggleClass('show');
    }

    isValue: number = 0;

    toggle(num: number) {
        this.isValue = num;
        this.governance_id = num;
        localStorage.setItem('governance_id', JSON.stringify(num));
        this.utilities.governanceTypeSource.next(num);

    }
}
