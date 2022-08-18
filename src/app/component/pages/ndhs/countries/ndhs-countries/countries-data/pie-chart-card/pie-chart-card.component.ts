import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import * as am4core from '@amcharts/amcharts4/core';

@Component({
    selector: 'pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.css'],
})
export class PieChartCardComponent implements OnInit {
    @Input() taxonomies: any;
    loading:boolean =  true;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        am4core.options.autoDispose = true;

        if(this.taxonomies && this.taxonomies.length){
            this.loading = false;
        }
    }

    openViewData(
        governance_id: number,
        development_id: number,
        taxonomy_id: number
    ) {
        let country_id = JSON.parse(localStorage.getItem('country_id') || '');
        let currentYear = JSON.parse(localStorage.getItem('year') || '');

        let dialogRef = this.dialog.open(DataModalComponent, {
            width: '80%',
            height: '90%',
            data: {
                governance_id: governance_id,
                development_id: development_id,
                taxonomy_id: taxonomy_id,
                country_id: country_id,
                year: currentYear,
            },
        });
    }
}
