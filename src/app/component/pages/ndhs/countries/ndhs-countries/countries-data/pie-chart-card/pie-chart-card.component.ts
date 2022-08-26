import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as am4core from '@amcharts/amcharts4/core';

@Component({
    selector: 'pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.css'],
})
export class PieChartCardComponent implements OnInit, AfterViewInit {
    @Input() chartdiv: any;
    loading:boolean =  true;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        am4core.options.autoDispose = true;
         console.log(this.chartdiv);
<<<<<<< HEAD
         
    }

    ngAfterViewInit(): void {
        
=======
       
>>>>>>> a73b94b7264e3b1451e0851333a1ecc59a166cfb
    }

}
