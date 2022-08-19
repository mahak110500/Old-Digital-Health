import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { PieChart3D } from '@amcharts/amcharts4/charts';
import { CommonService } from 'src/app/services/common.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Observable } from 'rxjs';


am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-ndhs-countries',
    templateUrl: './ndhs-countries.component.html',
    styleUrls: ['./ndhs-countries.component.css'],
})
export class NdhsCountriesComponent implements OnInit, AfterViewInit {
    health_taxonomies_prospective: any = [];
    health_taxonomies_present: any = [];
    public chart: am4charts.PieChart3D = new PieChart3D;
    title: any;
    series:any;
    countries: any = [];
    country_list: any;
    currentYear: any;
    country_id: any;
    country_flag: any;
    country_iso_code: any;

    readiness_score: any;
    availability_score: any;

    capacity_building_score: any;
    development_strategy_score: any;

    // countries!: Observable<Country[]>;

    constructor(private common: CommonService,){}

    ngOnInit(): void {

        this.common.getAllCountries().subscribe((res) => {
             console.log(res);
            this.country_list = res;
            console.log(this.country_list);
            
        })
    }

    getNDHsDeatils(governanceId: any){
        this.country_id = JSON.parse(localStorage.getItem('country_id') || '');
    }


    ngAfterViewInit() {

        //HEALTH TEXANOMY PRESENT
        this.chart = am4core.create("chartdiv_health_present", am4charts.PieChart3D);
        this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        this.chart.legend = new am4charts.Legend();

        this.chart.data = [
            {
                taxonomy: "Readiness",
                percentage: 40
            },
            {
                taxonomy: "Availability",
                percentage: 60
            },
            {
                percentage: 10
            }
        ];

        this.chart.innerRadius = 100;

        this.series = this.chart.series.push(new am4charts.PieSeries3D());
        this.series.dataFields.value = "percentage";
        this.series.dataFields.category = "taxonomy";

        //for setting the color
        this.series.colors.list = [
            '#1181B2',
            '#05D5AA',
            '#E2E2E4',
        ].map(function (color) {
            return new (am4core.color as any)(color);
        });

        //for the middle text
        var label = this.series.createChild(am4core.Label);
        label.text = '67%';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 50;
        label.fontWeight = 'normal';

        //to display only taxonomy and hide the percentage
        this.series.labels.template.text = '{taxonomy}';
        this.series.slices.template.tooltipText = '{category}'; //hides percentage
        this.series.fontSize = '20';
        this.series.fontWeight = 'bold';



        //HEALTH TEXANOMY PROSPECTIVE
        this.chart = am4core.create("chartdiv_health_prospective", am4charts.PieChart3D);
        this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        this.chart.legend = new am4charts.Legend();

        this.chart.data = [
            {
                taxonomy: "Readiness",
                percentage: 20
            },
            {
                taxonomy: "Availability",
                percentage: 50
            },
            {
                percentage: 30
            }
        ];

        this.chart.innerRadius = 100;

        this.series = this.chart.series.push(new am4charts.PieSeries3D());
        this.series.dataFields.value = "percentage";
        this.series.dataFields.category = "taxonomy";

        //for setting the color
        this.series.colors.list = [
            '#2F4770',
            '#0860FE',
            '#E2E2E4',
        ].map(function (color) {
            return new (am4core.color as any)(color);
        });

        //for the middle text
        var label = this.series.createChild(am4core.Label);
        label.text = '98%';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 50;
        label.fontWeight = 'normal';

        //to display only taxonomy and hide the percentage
        this.series.labels.template.text = '{taxonomy}';
        this.series.slices.template.tooltipText = '{category}'; //hides percentage
        this.series.fontSize = '20';
        this.series.fontWeight = 'bold';
        


    }

    getExistedCountriesList() {
        let data = {
            year: this.currentYear,
        };

        this.common.getExistedCountries(data).subscribe((result) => {
            this.country_list = result;
        });
    }
    

}


