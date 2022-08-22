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
    @Input() chartdiv: any;
    loading:boolean =  true;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        am4core.options.autoDispose = true;

        //  console.log(this.chartdiv);
        
        // if(this.taxonomies && this.taxonomies.length){
        //     this.loading = false;
        // }
    }

}
