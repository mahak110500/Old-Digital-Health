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
    radar_chart: any;
    country1: any;
    country2: any;

    isValue: number = 0;
    panelOpenState = false;
    step = 0;
    stepinner = 0;
    taxonomy_overviews: any;
    taxonomy_indicators: any;

    dash_array: any;

    @ViewChild('charts') charts: ElementRef | any;


    constructor(private common: CommonService, private utilities: UtilitiesService) { }

    ngOnInit() {
        this.dash_array = [1, 2, 3, 4, 5];

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
        // this.BarChart();
        this.BarChartData();
        // this.RadarChart();
        this.RadarChartData();
        this.taxonomyTableDetails();

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

        if (this.bar_chart) {

            am5.array.each(am5.registry.rootElements, function (root) {
                if (root && root.dom && root.dom.id == 'chartdiv1') {
                    root.dispose();
                }
            });
            let root = am5.Root.new('chartdiv1');

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            let chart: any = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: 'none',
                    wheelY: 'none',
                })
            );

            let data = [
                {
                    year: '1',
                    income: 100,
                    columnConfig: {
                        fill: am5.color(0x00306c),
                    },
                },
                {
                    year: '2',
                    income: 75,
                    columnConfig: {
                        fill: am5.color(0x4a92ec),
                    },
                },
                {
                    year: '3',
                    income: 50,
                    columnConfig: {
                        fill: am5.color(0x4aec9b),
                    },
                },
                {
                    year: '4',
                    income: 25,
                    columnConfig: {
                        fill: am5.color(0xfa8e15),
                    },
                },
            ];

            if (this.bar_chart_new.length == 1) {
                this.bar_chart_new.forEach((element: any) => {
                    let bar_data_same = {
                        text: element.text,
                        comIncome: element.comIncome,
                        compText: element.compText,
                        // img: './assets/images/line.png',
                    };
                    if (element.per <= 25) {
                        data[3] = { ...data[3], ...bar_data_same };
                    } else if (element.per <= 50) {
                        data[2] = { ...data[2], ...bar_data_same };
                    } else if (element.per <= 75) {
                        data[1] = { ...data[1], ...bar_data_same };
                    } else if (element.per <= 100) {
                        data[0] = { ...data[0], ...bar_data_same };
                    }
                });
            } else {
                this.bar_chart.forEach((element: any) => {
                    let bar_data = {
                        text: element.country_name,
                        comIncome: element.percentage + '%',
                        compText: element.country_name,
                        // img: './assets/images/line.png',
                    };
                    if (element.percentage <= 25) {
                        data[3] = { ...data[3], ...bar_data };
                    } else if (element.percentage <= 50) {
                        data[2] = { ...data[2], ...bar_data };
                    } else if (element.percentage <= 75) {
                        data[1] = { ...data[1], ...bar_data };
                    } else if (element.percentage <= 100) {
                        data[0] = { ...data[0], ...bar_data };
                    }
                });
            }



            //Create axes
            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: 'year',
                    renderer: am5xy.AxisRendererY.new(root, {
                        cellStartLocation: 0.2,
                        cellEndLocation: 0.9,
                        strokeOpacity: 1,
                        strokeWidth: 1,
                    }),
                })
            );

            const myTheme = am5.Theme.new(root);

            myTheme.rule('Grid').setAll({
                visible: false,
            });

            root.setThemes([myTheme]);

            let yRenderer = yAxis.get('renderer');
            yRenderer.labels.template.setAll({
                visible: false,
            });

            yAxis.data.setAll(data);

            let xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    numberFormat: "''",
                    renderer: am5xy.AxisRendererX.new(root, {
                        strokeOpacity: 1,
                        strokeWidth: 1,
                    }),
                })
            );

            let myRange = [
                {
                    x: 20,
                },
                {
                    x: 40,
                },
                {
                    x: 60,
                },
                {
                    x: 80,
                },
                {
                    x: 100,
                },
            ];

            for (var i = 0; i < data.length + 1; i++) {
                let value = myRange[i].x;

                let rangeDataItem = xAxis.makeDataItem({
                    value: value,
                });

                let range = xAxis.createAxisRange(rangeDataItem);

                rangeDataItem.get('label').setAll({
                    forceHidden: false,
                    text: value + '%',
                });
            }

            //FOR THE BLACK PART BESIDES Y axis
            yAxis.children.moveValue(
                am5.Label.new(root, {
                    html:
                        `
                    <div style="background: #000;
                        color: #fff;
                        width: 50px;
                        height: 200px;
                        padding: 10px;
                        text-align: center;
                        border-radius: 15px 0px 0 15px;">
                        <div style="transform: rotate(-90deg);
                        position: absolute;
                        left: -50px;
                        top: 38%;">
                        <label style="font-size: 12px;
                        width: 150px;
                        position: relative;
                        top: 48%;">` +
                        this.bar_chart[0].development_type +
                        `</label>
                    <span style="font-size: 12px;"><b>` +
                        this.bar_chart[0].ultimate_field +
                        `</b><span>
                    <div>
                    </div>
                    `,
                }),
                0
            );


            // /Add series
            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: 'income',
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: 'income',
                    categoryYField: 'year',
                    sequencedInterpolation: true,
                })
            );

            series.columns.template.setAll({
                height: am5.percent(70),
                templateField: 'columnConfig',
                strokeOpacity: 0,
            });

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationX: 0.8,
                    locationY: -0.5,
                    sprite: am5.Label.new(root, {
                        centerY: am5.p50,
                        html: `<div style="text-align:center;">
                  {comIncome} <br> {compText}<br>
                  <img src="{img}" width="120" style="margin-top:-17px;margin-left:-17px;">
            </div>`,
                    }),
                });
            });

            // Add cursor

            let cursor = chart.set(
                'cursor',
                am5xy.XYCursor.new(root, {
                    // behavior: 'zoomY',
                })
            );
            cursor.lineX.set('visible', false);
            cursor.lineY.set('visible', false);

            series.data.setAll(data);
        }

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
            year: selectedYear

        };
        console.log(this.countries);
        console.log(this.developmentId);
        
        

        this.common.getBarChartData(data).subscribe((res) => {
            // console.log(res);
            this.bar_chart = res;
            this.bar_chart_new = [];

            let bar_data = {
                text: res[0].country_name + ',' + res[1].country_name,
                comIncome:
                    res[0].percentage + '%,' + res[1].percentage + '%',
                compText: res[0].country_name + ',' + res[1].country_name,
                img: './assets/images/line.png',
                per: res[0].percentage,
            };
            if (res[0].percentage <= 25 && res[1].percentage <= 25) {
                this.bar_chart_new.push(bar_data);
            }
            if (
                res[0].percentage > 25 &&
                res[0].percentage <= 60 &&
                res[1].percentage > 25 &&
                res[1].percentage <= 60
            ) {
                this.bar_chart_new.push(bar_data);
            } else if (
                res[0].percentage > 60 &&
                res[0].percentage <= 80 &&
                res[1].percentage > 60 &&
                res[1].percentage <= 80
            ) {
                this.bar_chart_new.push(bar_data);
            } else if (
                res[0].percentage > 80 &&
                res[0].percentage <= 100 &&
                res[1].percentage > 80 &&
                res[1].percentage <= 100
            ) {
                this.bar_chart_new.push(bar_data);
            }

            this.governance_name = res[0].governance_name;
            this.BarChart();


        })



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
        // console.log(this.developmentId);


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
                            value: [
                                this.country1.a_score,
                                this.country1.c_score,
                                this.country1.d_score,
                                this.country1.r_score,
                            ],
                            name: this.country1.country,
                            areaStyle: {
                                color: 'rgba(51, 138, 20, 0.6)',
                            },
                        },
                        {
                            value: [
                                this.country2.a_score,
                                this.country2.c_score,
                                this.country2.d_score,
                                this.country2.r_score,
                            ],
                            name: this.country2.country,
                            areaStyle: {
                                color: 'rgba(92,221,189,0.6)',
                            },
                        },

                    ],
                },
            ],
        }

    }

    RadarChartData() {
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            countries: this.countries,
            developmentId: environment.default_developments,
            governanceId: this.governance,
            taxonomyId: this.taxonomy_id,
            year: selectedYear,
        };

        this.common.getRadarChartData(data).subscribe((result) => {
            this.radar_chart = result;
            // console.log(result);

            const results = this.nestGroupsBy(result, ['country_name']);
            // console.log(results);

            let resultDetails = Object.values(results);
            // console.log(resultDetails);


            this.country1 = this.getCountryData(resultDetails[0]);
            this.country2 = this.getCountryData(resultDetails[1]);

            // console.log(this.country1);
            // console.log(this.country2);

            this.RadarChart();
        })

    }

    getCountryData(data: any) {
        // console.log(data);

        let availability_score: any;
        let radiness_score: any;
        let capacity_score: any;
        let development_score: any;
        let country: any;

        data.forEach((element: any) => {
            country = element.country_name;
            if (element.ultimate_field == 'Readiness') {
                radiness_score = element.percentage;
            } else if (element.ultimate_field == 'Availability') {
                availability_score = element.percentage;
            } else if (element.ultimate_field == 'Capacity Building') {
                capacity_score = element.percentage;
            } else if (element.ultimate_field == 'Development Strategy') {
                development_score = element.percentage;
            }
        });

        let result = {
            r_score: radiness_score,
            a_score: availability_score,
            c_score: capacity_score,
            d_score: development_score,
            country: country,
        };

        return result;

    }

    groupBy(conversions: any, property: any) {
        return conversions.reduce((acc: any, obj: any) => {
            let key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    nestGroupsBy(arr: any, properties: any) {
        properties = Array.from(properties);
        if (properties.length === 1) {
            return this.groupBy(arr, properties[0]);
        }
        const property = properties.shift();
        var grouped = this.groupBy(arr, property);
        for (let key in grouped) {
            grouped[key] = this.nestGroupsBy(
                grouped[key],
                Array.from(properties)
            );
        }
        return grouped;
    }

    //TABLE DATA
    taxonomyTableDetails() {
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
        this.common.getTaxonomyTableData(data).subscribe((result) => {
            console.log(result);

            this.taxonomy_overviews = result;
            const results = this.nestGroupsBy(result, ['indicator_name']);
            this.taxonomy_indicators = Object.entries(results);
        });
    }

    dropDown2() {
        $('.toggleSubmenu2').next('ul').toggleClass('show');
    }
    dropDown1() {
        $('.toggleSubmenu1').next('ul').toggleClass('show');
    }

    setStep(index: number) {
        this.step = 0;
        return true;
    }

    setStepInner(index: number) {
        this.stepinner = index;
    }

    toggle(num: number) {
        this.isValue = num;
    }




}
