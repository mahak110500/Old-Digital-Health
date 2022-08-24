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


    @ViewChild('charts') charts: ElementRef | any;


    constructor(private common: CommonService) { }

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
        series.fontSize = 11;
        series.minRadius = 15;
        series.maxRadius = 15;

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

    BubbleChartData(){

        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
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
        


        this.common.getBubbleChartData(data).subscribe((result)=> {
            result.forEach((element:any) => {
                // console.log(result);
                console.log(data);
                
                                
            });
            this.BubbleChart;
        });
    }





}
