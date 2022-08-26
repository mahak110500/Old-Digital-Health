import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import echarts from 'echarts/types/dist/echarts';
import data from 'src/assets/data/network.json';
import * as echarts from 'echarts';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { CommonService } from 'src/app/services/common.service';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/services/utilities.service';






@Component({
    selector: 'app-comparative-overview',
    templateUrl: './comparative-overview.component.html',
    styleUrls: ['./comparative-overview.component.css'],
})

export class ComparativeOverviewComponent implements OnInit {
    networkData: any = data;
    developmentId: any;
    governance: any;
    ultimateId: any;
    taxonomy_id: number = 0;
    taxonomy_name: any;

    bar_chart: any;
    bar_chart_new: any;
    chart: any;
    showBarChart = true;
    chartTitle = 'Bubble Chart';
    range25: any = [];
    range60: any = [];
    range80: any = [];
    range100: any = [];

    year: any;
    countries: any;
    governance_name: any;

    optionRadar: any;



    @ViewChild('charts') charts: ElementRef | any;


    constructor(private common: CommonService, private utilities: UtilitiesService) { }

    ngOnInit() {
        this.ultimateId = environment.default_ultimate_id;
        this.developmentId = environment.default_development_id;
        $(document).ready(function () {
            $('.toggle-tab-button > button').on('click', function () {
                $('.vertical-tab-area').toggleClass('open');
            });
            $('.sub-category li, .parent-li').click(function () {
                $('.sub-category li, .parent-li').removeClass('activelink');
                $(this).addClass('activelink');
                var tagid = $(this).data('tag');
                $('.list').removeClass('active').addClass('hide');
                $('#' + tagid)
                    .addClass('active')
                    .removeClass('hide');
            });

        });

        this.utilities.yearSource.subscribe((message: any) => {
            this.year = message;
            if (localStorage.getItem('selected_country')) {
                this.countries = localStorage.getItem('selected_country');
            } else {
                if (this.year == 2022) {
                    this.countries = environment.default_country_2022;
                } else {
                    this.countries = environment.default_country_2021;
                }
            }
        });


        this.utilities.governanceTypeSource.subscribe((message: any) => {
            this.governance = message;
            if (this.governance == 1) {
                this.taxonomy_id = environment.default_taxonomy_general;
            } else {
                this.taxonomy_id = environment.default_taxonomy_digital;
            }
        });

        this.showBarChart = true;


        this.BubbleChartData();
        this.BarChart();
        // this.BarChartData();
        this.RadarChart();


    }

    ngAfterViewInit() {
        this.NetworkChart();
        this.BarChart();
        this.toggleChartButtons();
    }

    NetworkChart() {
        let chartDom = this.charts.nativeElement;//accessing through local reference 'charts'
        let myChart = echarts.init(chartDom);//initializing the chart
        let option: any;

        // console.log(this.networkData);

        //FOR SHOWING LABEL NAMES
        this.networkData.nodes.forEach(function (node: any) {
            node.label = {
                show: node.symbolSize > 30,//this shows the label upto 30
            };
        });
        option = {
            title: {
                text: '',
                subtext: '',
                top: 'bottom',
                left: 'right',
            },
            tooltip: {},//shows the popeup when mouseover the circle
            legend: [
                {
                    // selectedMode: 'single',
                    data: this.networkData.categories.map(function (a: {
                        name: string;

                    }) {
                        // console.log(a.name);  //Digital Health and Health & IT                      
                        return a.name;
                    }),
                },
            ],
            series: [
                {
                    name: '',
                    type: 'graph',
                    layout: 'none',
                    data: this.networkData.nodes,
                    links: this.networkData.links,
                    categories: this.networkData.categories,
                    roam: true,
                    label: {
                        color: '#fff',
                        position: 'inside',
                        align: 'center',
                        formatter: '{b}',
                        verticalAlign: 'middle',
                        fontSize: '10',
                    },
                    // label: {
                    //   color: '#fff',
                    //   fontSize: '80',
                    //   position: 'center',
                    // },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3,
                    },
                },
            ],
        };
        myChart.setOption(option);

        myChart.on('click', (params) => {
            if (params.borderColor == undefined) {
                let test = JSON.stringify(params.data);
                let d_info = JSON.parse(test);
                this.developmentId = d_info.d_id;
                this.governance = d_info.g_id;
                this.ultimateId = d_info.u_id;
                this.taxonomy_id = d_info.t_id;

            }
        });
    }

    //TO TOGGLE CHART BUTTONS
    toggleChartButtons() {
        this.showBarChart = !this.showBarChart;
        if (this.showBarChart) {
            this.chartTitle = 'Bubble Chart';
            // this.BarChart();
        } else {
            this.chartTitle = 'Bar Chart';
            this.BubbleChart();
        }
    }


    BarChart() {
        // if (this.bar_chart) {
        //     console.log(this.bar_chart);

        // }

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv1", am4charts.XYChart);

        chart.data = [{
            "category": "Research",
            "value": 450
        }, {
            "category": "Marketing",
            "value": 1200
        }, {
            "category": "Distribution",
            "value": 1850
        }];

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "value";
        series.dataFields.categoryY = "category";



    }

    BarChartData() {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.countries,
            developmentId: this.developmentId,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
        };
        console.log(this.countries);


        this.common.getBarChartData(data).subscribe((result) => {
            console.log(data);

            this.bar_chart = result;
            console.log(this.bar_chart);

        });
    }

    BubbleChart() {
        var chart = am4core.create("chartdiv2", am4plugins_forceDirected.ForceDirectedTree);

        var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        series.data = [];
        series.data = [
            {
                id: '1',
                name: '25%',
                value: 2,
                fixed: true,
                color: '#FA8E15',
                x: am4core.percent(40),
                y: am4core.percent(40),
                children: this.range25,
            },
            {
                id: '2',
                name: '100%',
                color: '#00306C',
                fixed: true,
                value: 2,
                x: am4core.percent(50),
                y: am4core.percent(25),
                children: this.range100,
            },
            {
                id: '3',
                name: '80%',
                color: '#4A92EC',
                fixed: true,
                value: 2,
                x: am4core.percent(50),
                y: am4core.percent(50),
                children: this.range80,
            },
            {
                id: '4',
                name: '60%',
                color: '#4AEC9B',
                fixed: true,
                value: 2,
                x: am4core.percent(60),
                y: am4core.percent(40),
                children: this.range60,
            },
            {
                name: '',
                fixed: true,
                value: 1,
                x: am4core.percent(150),
                y: am4core.percent(40),
                children: [
                    {
                        name: '',
                        value: 4,
                    },
                ],
            },
        ]

        // Set up data fields
        series.dataFields.linkWith = 'linkWith';
        series.dataFields.name = 'name';
        series.dataFields.id = 'id';
        series.dataFields.value = 'value';
        series.dataFields.children = 'children';
        series.dataFields.fixed = 'fixed';
        series.dataFields.color = 'color'

        // Add labels
        series.nodes.template.label.text = "{name}";
        series.fontSize = 10;
        series.minRadius = 16;
        series.maxRadius = 16;

        series.nodes.template.propertyFields.x = 'x';
        series.nodes.template.propertyFields.y = 'y';
        series.nodes.template.tooltipText = '{name}';
        series.nodes.template.fillOpacity = 1;

        series.nodes.template.label.text = '{name}';
        series.fontSize = 8;

        series.nodes.template.label.hideOversized = true;
        series.nodes.template.label.truncate = true;
        series.links.template.distance = 0;
        series.links.template.disabled = true;
        series.nodes.template.interactionsEnabled = false;


        series.nodes.template.strokeWidth = 0;
        series.links.template.strokeOpacity = 0;
        series.nodes.template.label.fill = am4core.color('#fff');

        series.nodes.template.outerCircle.strokeOpacity = 0;
        series.nodes.template.outerCircle.fillOpacity = 0;

        var title2 = chart.titles.create();


    }

    BubbleChartData() {

        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            developmentId: environment.default_developments,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
        };
        console.log(this.developmentId);
        

        this.range25 = [];
        this.range60 = [];
        this.range80 = [];
        this.range100 = [];


        this.common.getBubbleChartData(data).subscribe((result) => {
            result.forEach((e: any) => {
                // console.log(result);

                let bubble_chart = {
                    name: e.country_name, //country's name
                    value: 1 //decides the size of bubble
                }

                if (e.percentage <= 25) {
                    this.range25.push(bubble_chart);
                }
                else if (e.percentage <= 60) {
                    this.range60.push(bubble_chart);
                }
                else if (e.percentage <= 80) {
                    this.range80.push(bubble_chart);
                }
                else if (e.percentage <= 100) {
                    this.range100.push(bubble_chart);
                }


            });
            this.BubbleChart;
        });
    }

    RadarChart() {
        this.optionRadar = {
            color: ['#338A14', 'rgba(92,221,189,1)', '#56A3F1', '#FF917C'],
            title: {
                text: this.taxonomy_name,
            },
            legend: {},
            radar: [
                {
                    indicator: [
                        { text: 'Availability', max: 100 },
                        { text: 'Capacity Building', max: 100 },
                        { text: 'Development Strategy', max: 100 },
                        { text: 'Readiness', max: 100 },
                    ],
                    center: ['55%', '55%'],
                    radius: 110,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    axisName: {
                        color: '#707070',
                        fontSize: '10',
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#DADADA', '#DADADA', '#CED5D3', '#B9BDBC'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(154,165,162,1)',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(154,165,162,1)',
                        },
                    },
                },
            ],
            series: [
                {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4,
                        },
                    },
                    data: [
                        {
                            value: [100, 8, 0.4, -80, 2000],
                            name: 'Data A'
                        },
                        {
                            value: [60, 5, 0.3, -100, 1500],
                            name: 'Data B',
                            areaStyle: {
                                color: 'rgba(255, 228, 52, 0.6)'
                            }
                        }

                    ],
                },
            ],
        }

    }

    RadarChartData(){
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            developmentId: environment.default_developments,
            governanceId: this.governance,
            ultimateId: this.ultimateId,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
        };
        console.log(this.developmentId);
        
        
        
        this.common.getRadarChartData(data).subscribe((result)=> {
            // console.log(data);
            
            console.log(result);
            

        })

    }






}
