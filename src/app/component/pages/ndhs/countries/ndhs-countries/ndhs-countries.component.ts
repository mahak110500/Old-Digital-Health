import { AfterViewChecked, AfterViewInit, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { PieChart3D } from '@amcharts/amcharts4/charts';
import { CommonService } from 'src/app/services/common.service';
import { asapScheduler, mapTo, Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { getLocaleFirstDayOfWeek, isPlatformBrowser } from '@angular/common';


am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-ndhs-countries',
    templateUrl: './ndhs-countries.component.html',
    styleUrls: ['./ndhs-countries.component.css'],
})
export class NdhsCountriesComponent implements OnInit, AfterViewInit {
    dataNew: any = [];
    digital_taxonomies_present: any = [];
    digital_taxonomies_prospective: any = [];
    health_taxonomies_prospective: any = [];
    health_taxonomies_present: any = [];
    ndhsDetails: any;
    triggerInit: boolean = true;


    public chart: am4charts.PieChart3D = new PieChart3D;
    title: any;
    series: any;
    countries: any = [];
    country_list: any;
    currentYear: any;
    country_id: any;
    country_flag: any;
    country_iso_code: any;
    country_name: any;


    readiness_score: any;
    availability_score: any;

    capacity_building_score: any;
    development_strategy_score: any;
    governance_id: any;
    // governanceId: any;

    // countries!: Observable<Country[]>;

    constructor(private common: CommonService,
        private utilities: UtilitiesService) { }


    ngOnInit(): void {


        this.utilities.showHeaderMenu.next(true);


        this.utilities.governanceTypeSource.subscribe((governanceId) => {


            this.dataNew = [];
            this.health_taxonomies_prospective = [];
            this.health_taxonomies_present = [];
            this.digital_taxonomies_present = [];
            this.digital_taxonomies_prospective = [];

            if (this.triggerInit) {
                console.log(governanceId);
                this.getNdhsCountriesDetails(governanceId);
            }

        });


        //to get all countries name and flag
        this.common.getAllCountries().subscribe((res) => {  console.log(res);

            this.country_list = res;
        })

    }

    getNdhsCountriesDetails(governanceId: any) {
        // console.log(governanceId);

        this.dataNew = [];
        this.health_taxonomies_prospective = [];
        this.health_taxonomies_present = [];

        this.digital_taxonomies_present = [];
        this.digital_taxonomies_prospective = [];

        this.country_id = JSON.parse(localStorage.getItem('country_id') || '');
        this.country_name = JSON.parse(localStorage.getItem('country_name') || '');
        this.country_flag = JSON.parse(localStorage.getItem('country_flag') || '');

        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        console.log(governanceId, this.country_id, this.currentYear);



        this.common.getNdhsCountriesDetails(governanceId, this.country_id, this.currentYear)
            .subscribe((result) => {
                console.log(result);

                this.ndhsDetails = result;
                //console.log(this.ndhsDetails);  //array for present and prospective development

                if (governanceId == 1) {
                    // console.log(this.ndhsDetails);

                    let presentDevelopment = [this.ndhsDetails['Present Development']];
                    presentDevelopment.forEach(
                        (element: any) => {


                            Object.keys(element).forEach((key) => {
                                let readiness_score = parseInt(
                                    element[key][0].score
                                );

                                let availability_score = parseInt(
                                    element[key][1].score
                                );

                                let readiness_percentage = Math.round(
                                    this.getPercantage(readiness_score)
                                );
                                let availability_percentage = Math.round(
                                    this.getPercantage(availability_score)
                                );
                                let total_percentage =
                                    readiness_percentage +
                                    availability_percentage;
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[key][0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'present',
                                    readiness_score: readiness_score,
                                    availability_score: availability_score,
                                    readiness_percentage: readiness_percentage,
                                    availability_percentage:
                                        availability_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[key][0].taxonomy_id,
                                    development_id:
                                        element[key][0].development_id,
                                    governance_id:
                                        element[key][0].governance_id,
                                    prefix: 'health_present',
                                };

                                this.dataNew.push(details);


                                this.health_taxonomies_present.push(details);
                            });
                        }
                    );

                    let prospectiveDevelopment = [this.ndhsDetails['Prospective Development']];
                    prospectiveDevelopment.forEach(
                        (element: any) => {
                            Object.keys(element).forEach((key) => {
                                let capacity_building_score = parseInt(
                                    element[key][0].score
                                );
                                let development_strategy_score = parseInt(
                                    element[key][1].score
                                );
                                let capacity_building_percentage = Math.round(
                                    this.getPercantage(capacity_building_score)
                                );
                                let development_strategy_percentage = Math.round(
                                    this.getPercantage(development_strategy_score)
                                );
                                let total_percentage =
                                    capacity_building_percentage +
                                    development_strategy_percentage;
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[key][0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'prospective',
                                    capacity_building_score: capacity_building_score,
                                    development_strategy_score: development_strategy_score,
                                    capacity_building_percentage: capacity_building_percentage,
                                    development_strategy_percentage:
                                        development_strategy_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[key][0].taxonomy_id,
                                    development_id:
                                        element[key][0].development_id,
                                    governance_id:
                                        element[key][0].governance_id,
                                    prefix: 'health_prospective',
                                };
                                this.dataNew.push(details);
                                this.health_taxonomies_prospective.push(details);
                            });
                        }
                    );

                } else {

                    let presentD = [this.ndhsDetails['Present Development']];
                    presentD.forEach(
                        (element: any) => {

                            Object.keys(element).forEach((key) => {
                                let readiness_score = parseInt(
                                    element[key][0].score
                                );
                                let availability_score = parseInt(
                                    element[key][1].score
                                );
                                let readiness_percentage = Math.round(
                                    this.getPercantage(readiness_score)
                                );
                                let availability_percentage = Math.round(
                                    this.getPercantage(availability_score)
                                );
                                let total_percentage =
                                    readiness_percentage +
                                    availability_percentage;
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[key][0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'present',
                                    readiness_score: readiness_score,
                                    availability_score: availability_score,
                                    readiness_percentage: readiness_percentage,
                                    availability_percentage:
                                        availability_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[key][0].taxonomy_id,
                                    development_id:
                                        element[key][0].development_id,
                                    governance_id:
                                        element[key][0].governance_id,
                                    prefix: 'digital_present',
                                };
                                this.dataNew.push(details);

                                this.digital_taxonomies_present.push(details);
                            });
                        }
                    );

                    let prospectiveD = [this.ndhsDetails['Prospective Development']];
                    prospectiveD.forEach(
                        (element: any) => {
                            Object.keys(element).forEach((key) => {
                                let capacity_building_score = parseInt(
                                    element[key][0].score
                                );
                                let development_strategy_score = parseInt(
                                    element[key][1].score
                                );
                                let capacity_building_percentage = Math.round(
                                    this.getPercantage(capacity_building_score)
                                );
                                let development_strategy_percentage = Math.round(
                                    this.getPercantage(development_strategy_score)
                                );
                                let total_percentage =
                                    capacity_building_percentage +
                                    development_strategy_percentage;
                                let remaining_percentage =
                                    100 - total_percentage;
                                let details = {
                                    title: element[key][0].taxonomy_name,
                                    governance_type: 'health',
                                    developement_type: 'prospective',
                                    capacity_building_score: capacity_building_score,
                                    development_strategy_score: development_strategy_score,
                                    capacity_building_percentage: capacity_building_percentage,
                                    development_strategy_percentage:
                                        development_strategy_percentage,
                                    remaining_percentage: remaining_percentage,
                                    taxonomy_id: element[key][0].taxonomy_id,
                                    development_id:
                                        element[key][0].development_id,
                                    governance_id:
                                        element[key][0].governance_id,
                                    prefix: 'digital_prospective',
                                };

                                this.dataNew.push(details);
                                this.digital_taxonomies_prospective.push(details);
                            });
                        }
                    );

                }
                // this.showNDHsCountriesDetails();
                this.ngAfterViewInit();

            });



    }

    getPercantage(value: number) {
        let per = (value / 200) * 100;
        return per;
    }

    ngAfterViewInit() {
        if (this.governance_id == 1) {
            setTimeout(() => {

                //HEALTH TEXANOMY PRESENT
                this.health_taxonomies_present.forEach(
                    (taxonomy: any, index: number) => {

                        let i = 1;
                        this.chart = am4core.create(
                            'chartdiv_health_present' + (i + index),
                            am4charts.PieChart3D
                        );


                        this.title = taxonomy.title;
                        this.availability_score = taxonomy.availability_score;
                        this.readiness_score = taxonomy.readiness_score;

                        // this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        this.chart.data = [
                            {
                                taxonomy: 'Readiness',
                                percentage: taxonomy.readiness_percentage,
                            },
                            {
                                taxonomy: 'Avaliability',
                                percentage: taxonomy.availability_percentage,
                            },
                            {
                                percentage: taxonomy.remaining_percentage,
                            },
                        ];

                        this.chart.innerRadius = 40;
                        this.chart.depth = 10;

                        let series = this.chart.series.push(
                            new am4charts.PieSeries3D()
                        );
                        series.dataFields.value = 'percentage';
                        series.dataFields.category = 'taxonomy';

                        series.colors.list = [
                            '#1181B2',
                            '#05D5AA',
                            '#E2E2E4',
                        ].map(function (color) {
                            return new (am4core.color as any)(color);
                        });

                        var label = series.createChild(am4core.Label);
                        label.text =
                            taxonomy.readiness_percentage +
                            taxonomy.availability_percentage +
                            '%';
                        label.horizontalCenter = 'middle';
                        label.verticalCenter = 'middle';
                        label.fontSize = 26;
                        label.fontWeight = 'normal';

                        series.ticks.template.events.on('ready', hideSmall);
                        series.ticks.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.events.on('ready', hideSmall);
                        series.labels.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.maxWidth = 70;
                        series.labels.template.wrap = true;

                        function hideSmall(ev: any) {
                            if (ev.target.dataItem.hasProperties == false || ev.target.dataItem.dataContext.percentage == 0) {
                                ev.target.hide();
                            } else {
                                ev.target.show();
                            }
                        }

                        series.labels.template.text = '{taxonomy}';

                        series.slices.template.tooltipText = '{category}';
                        series.fontSize = '10';
                        series.fontWeight = 'bold';
                    }
                );

                //HEALTH TEXANOMY PROSPECTIVE
                this.health_taxonomies_prospective.forEach(
                    (taxonomy: any, index: number) => {


                        let i = 1;
                        this.chart = am4core.create(
                            'chartdiv_health_prospective' + (i + index),
                            am4charts.PieChart3D
                        );
                        this.title = taxonomy.title;
                        this.capacity_building_score = taxonomy.capacity_building_score;
                        this.development_strategy_score = taxonomy.development_strategy_score;

                        //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        this.chart.data = [
                            {
                                taxonomy: 'Capacity Building',
                                percentage: taxonomy.capacity_building_percentage,
                            },
                            {
                                taxonomy: 'Development Strategy',
                                percentage: taxonomy.development_strategy_percentage,
                            },
                            {
                                percentage: taxonomy.remaining_percentage,
                            },
                        ];

                        this.chart.innerRadius = 40;
                        this.chart.depth = 10;

                        let series = this.chart.series.push(
                            new am4charts.PieSeries3D()
                        );
                        series.dataFields.value = 'percentage';
                        series.dataFields.category = 'taxonomy';

                        series.colors.list = [
                            '#2F4770',
                            '#0860FE',
                            '#E2E2E4',
                        ].map(function (color) {
                            return new (am4core.color as any)(color);
                        });

                        var label = series.createChild(am4core.Label);
                        label.text =
                            taxonomy.development_strategy_percentage +
                            taxonomy.capacity_building_percentage +
                            '%';
                        label.horizontalCenter = 'middle';
                        label.verticalCenter = 'middle';
                        label.fontSize = 26;
                        label.fontWeight = 'normal';

                        series.ticks.template.events.on('ready', hideSmall);
                        series.ticks.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.events.on('ready', hideSmall);
                        series.labels.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.maxWidth = 70;
                        series.labels.template.wrap = true;

                        function hideSmall(ev: any) {
                            if (ev.target.dataItem.hasProperties == false || ev.target.dataItem.dataContext.percentage == 0) {
                                ev.target.hide();
                            } else {
                                ev.target.show();
                            }
                        }

                        series.labels.template.text = '{taxonomy}';

                        series.slices.template.tooltipText = '{category}';
                        series.fontSize = '9';
                        series.fontWeight = 'bold';
                    }
                );

            }, 2000)
        } else {

            setTimeout(() => {
                //DIGITAL TEXANOMY PRESENT
                this.digital_taxonomies_present.forEach(
                    (taxonomy: any, index: number) => {
                        let i = 6;
                        this.chart = am4core.create(
                            'chartdiv_digital_present' + (i + index),
                            am4charts.PieChart3D
                        );

                        this.title = taxonomy.title;
                        this.availability_score = taxonomy.availability_score;
                        this.readiness_score = taxonomy.readiness_score;

                        //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        this.chart.data = [
                            {
                                taxonomy: 'Readiness',
                                percentage: taxonomy.readiness_percentage,
                            },
                            {
                                taxonomy: 'Avaliability',
                                percentage: taxonomy.availability_percentage,
                            },
                            {
                                percentage: taxonomy.remaining_percentage,
                            },
                        ];

                        this.chart.innerRadius = 40;
                        this.chart.depth = 10;

                        let series = this.chart.series.push(
                            new am4charts.PieSeries3D()
                        );
                        series.dataFields.value = 'percentage';
                        series.dataFields.category = 'taxonomy';

                        series.colors.list = [
                            '#71ADB5',
                            '#1F914F',
                            '#E2E2E4',
                        ].map(function (color) {
                            return new (am4core.color as any)(color);
                        });

                        var label = series.createChild(am4core.Label);
                        label.text =
                            taxonomy.readiness_percentage +
                            taxonomy.availability_percentage +
                            '%';
                        label.horizontalCenter = 'middle';
                        label.verticalCenter = 'middle';
                        label.fontSize = 26;
                        label.fontWeight = 'normal';

                        series.ticks.template.events.on('ready', hideSmall);
                        series.ticks.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.events.on('ready', hideSmall);
                        series.labels.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.maxWidth = 70;
                        series.labels.template.wrap = true;

                        function hideSmall(ev: any) {
                            if (ev.target.dataItem.hasProperties == false || ev.target.dataItem.dataContext.percentage == 0) {
                                ev.target.hide();
                            } else {
                                ev.target.show();
                            }
                        }

                        series.labels.template.text = '{taxonomy}';

                        series.slices.template.tooltipText = '{category}';
                        series.fontSize = '9';
                        series.fontWeight = 'bold';
                    }
                );

                this.digital_taxonomies_prospective.forEach(
                    (taxonomy: any, index: number) => {
                        let i = 6;
                        this.chart = am4core.create(
                            'chartdiv_digital_prospective' + (i + index),
                            am4charts.PieChart3D
                        );
                        this.title = taxonomy.title;
                        this.capacity_building_score = taxonomy.capacity_building_score;
                        this.development_strategy_score = taxonomy.development_strategy_score;

                        //this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        this.chart.data = [
                            {
                                taxonomy: 'Capacity Building',
                                percentage: taxonomy.capacity_building_percentage,
                            },
                            {
                                taxonomy: 'Development Strategy',
                                percentage: taxonomy.development_strategy_percentage,
                            },
                            {
                                percentage: taxonomy.remaining_percentage,
                            },
                        ];

                        this.chart.innerRadius = 40;
                        this.chart.depth = 10;

                        let series = this.chart.series.push(
                            new am4charts.PieSeries3D()
                        );
                        series.dataFields.value = 'percentage';
                        series.dataFields.category = 'taxonomy';

                        series.colors.list = [
                            '#14CCAA',
                            '#41565A',
                            '#E2E2E4',
                        ].map(function (color) {
                            return new (am4core.color as any)(color);
                        });

                        var label = series.createChild(am4core.Label);
                        label.text =
                            taxonomy.capacity_building_percentage +
                            taxonomy.development_strategy_percentage +
                            '%';
                        label.horizontalCenter = 'middle';
                        label.verticalCenter = 'middle';
                        label.fontSize = 26;
                        label.fontWeight = 'normal';

                        series.ticks.template.events.on('ready', hideSmall);
                        series.ticks.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.events.on('ready', hideSmall);
                        series.labels.template.events.on(
                            'visibilitychanged',
                            hideSmall
                        );
                        series.labels.template.maxWidth = 70;
                        series.labels.template.wrap = true;

                        function hideSmall(ev: any) {
                            if (ev.target.dataItem.hasProperties == false || ev.target.dataItem.dataContext.percentage == 0) {
                                ev.target.hide();
                            } else {
                                ev.target.show();
                            }
                        }

                        series.labels.template.text = '{taxonomy}';

                        series.slices.template.tooltipText = '{category}';
                        series.fontSize = '9';
                        series.fontWeight = 'bold';
                    }
                );

            }, 2000)

        }

    }

    // ngAfterViewInit(): void {
    //     this.showNDHsCountriesDetails();

    // }




    getSelectedCountry(country: any) {

        if (country) {

            this.country_id = country.country_id;
            this.country_flag = country.flag;
            this.country_iso_code = country.iso_code;
            this.country_name = country.country_name;
            this.currentYear = country.year;

            if (localStorage.getItem('country_id') != null) {
                localStorage.removeItem('country_id');
                localStorage.removeItem('country_flag');
                localStorage.removeItem('country_iso_code');
                localStorage.removeItem('country_name');
                localStorage.removeItem('year');


                localStorage.setItem('country_id', JSON.stringify(this.country_id));
                localStorage.setItem('country_name', JSON.stringify(this.country_name));
                localStorage.setItem('country_flag', JSON.stringify(this.country_flag));
                localStorage.setItem('country_iso_code', JSON.stringify(this.country_iso_code));
                localStorage.setItem('year', JSON.stringify(this.currentYear));
            } else {
                localStorage.setItem('country_id', JSON.stringify(this.country_id));
                localStorage.setItem('country_flag', JSON.stringify(this.country_flag));
                localStorage.setItem('country_iso_code', JSON.stringify(this.country_iso_code));
                localStorage.setItem('year', JSON.stringify(this.currentYear));
            }

            this.getNdhsCountriesDetails(this.governance_id);

        }

    }

    ngOnDestroy(): void {
        this.utilities.showHeaderMenu.next(false);
        this.utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
    }

}











