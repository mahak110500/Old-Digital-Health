import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as echarts from 'echarts';
import * as am5 from '@amcharts/amcharts5';
import graph from 'src/assets/data/network2.json';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import * as am5map from '@amcharts/amcharts5/map';
import { ComparativeService } from 'src/app/services/comparative.service';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

// import worldLow from "@amcharts/amcharts5/geodata/franceLow";

type EChartsOption = echarts.EChartsOption

var option: EChartsOption;

interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}

@Component({
    selector: 'app-comparative-result',
    templateUrl: './comparative-result.component.html',
    styleUrls: ['./comparative-result.component.css'],
})

export class ComparativeResultComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('main') main: ElementRef | any;
    @ViewChild('mySelect') mySelect: ElementRef | any;
    chart:any;
    circle:any;
    selectedCountry = new FormControl;
    data:any;
    root:any;
    circleProperties:any;
    pointSeries:any;
    networkData:any;
    year:any;
    mySelections:any;
    comparCountry:any;
    countries:any=[];
    polygonSeries:any;
    mapDataInfo:any;
    container:any;
    comparativeresult:any;
    comparitive_countries:any =[];
    availability:any =[];
    readiness:any =[];
    developmentStrategy:any =[];
    capacityBuilding:any =[];
    defaultCountry:any= "";
    mapData:any;
    isLoading:any = false;
    selectedMapData:any
    oneCountry:any;
    twoCountry:any;
    selected:any;
    countries_2021:any;
    countries_2022:any;
    countriesData:any;
    selectedYear:any;
    selectedcountry:any =[];
    oldSelections:any;
    constructor(
        private countriesService: CountriesService,
        private _utilities: UtilitiesService,
        private comparativeservice: ComparativeService
        ){}
    ngOnInit(): void {
        this.countriesService.getCountries().subscribe((data) => {
            let country = Object.entries(data);
            country.forEach((element:any, index:any)=>{
            let Data = element[1];
            Data.forEach((element1:any, index1: any)=>{
                this.countries.push(element1);
                Object.entries(this.countries);
                 })
            })
        });
        // console.log(this.countries);

            this._utilities.yearSource.subscribe(res=>{
            this.data = res;
            // this.comparativeResult();
        });        
    }
    ngAfterViewInit(): void {
       
        this.barGraph();
        // this.onComparCountry();
        this.mapGraph();
        this.isLoading = true;

    }
    mapGraph(){    
        this.countriesService.getCountries().subscribe(result=>{
            // this.countries = result;
        this.root = am5.Root.new('chartdiv');
        this.root._logo.dispose();
        // this.root.setThemes([am5themes_Animated.new(this.root)]);
         this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                panX: 'none',
                panY: 'none',
                wheelX: 'none',
                wheelY: 'none',
                // projection: am5map.geoMercator(),
            })
        );
        let polygonSeries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            })
        );
        polygonSeries.mapPolygons.template.setAll({
            interactive: true,
            fill: am5.color(0xe6e6e6),
            tooltipText: '{name}',
            templateField: 'polygonSettings',
            strokeWidth: 2,
        });
        
        this.countriesService.mapData.subscribe(res=>{
            this.mapData = res;     
            // console.log(this.mapData);
            if(this.mapData.length < 3) {
            am5.array.each(this.countries, (c: any) => {                  
               if(this.mapData[0] == c.id){

                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );              
            }
            if(this.mapData[1] == c.id){

                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );
            }
            });
        this.polygonSeries.mapPolygons.template.states.create('active', {
            fill: this.root.interfaceColors.get('primaryButtonActive'),
        });
        this.pointSeries = this.chart.series.push(
            am5map.MapPointSeries.new(this.root, {})
        );
        this.pointSeries.bullets.push(() => {
            this.container = am5.Container.new(this.root, {});

            let tooltip: any = am5.Tooltip.
            
            new(this.root, {
                getFillFromSprite: false,
                paddingBottom: 0,
                paddingRight: 0,
                paddingLeft: 0,
                paddingTop: 0,
                maxWidth: 200,
                // showTooltipOn: 'always',
            });

            this.circleProperties = {
                radius: 3,
                tooltipY: 0,
                fill: am5.color(0xff0000),
                strokeWidth: 0,
                strokeOpacity: 0,
                tooltip: tooltip,
                tooltipHTML: `
          <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
          <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
          <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
        `,
            };

            this.circle = am5.Circle.new(this.root, this.circleProperties);

            this.container.children.push(this.circle);

            this.circle.states.create('hover', {
                radius: 4,
                scale: 2,
                strokeWidth: 3,
                strokeOpacity: 5,
                stroke: am5.color(0xff7b7b),
                // showTooltipOn: 'always',
            });

            return am5.Bullet.new(this.root, {
                sprite: this.container,
            });
        });

        // Push Data in Pointseries
        let addCountry = (
            longitude: number,
            latitude: number,
            title: string,
            flag: string
        ) => {
            this.pointSeries.data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                title: title,
                flag: '/assets/flags/' + flag,
            });
        };            
                for (var i = 0; i < this.countries.length; i++) {
                    let country = this.countries[i];
                    if(this.mapData.length < 3){
                        if(this.mapData[0] == country.id){
                        
                        addCountry(
                            country.lng,
                            country.lat,
                            country.name,
                            country.flag
                        );
                        }
                        if(this.mapData[1] == country.id){
                        
                            addCountry(
                                country.lng,
                                country.lat,
                                country.name,
                                country.flag
                            );
                        }
                    }
                }
            }
        })
    });    
 }  
    barGraph(){
        var chartDom = this.main.nativeElement;
        var myChart = echarts.init(chartDom);
            
        graph.nodes.forEach(function (node: GraphNode) {
            node.label = {
            show: node.symbolSize > 30
            };
        });
        option = {
            tooltip: {},
            series: [
            {
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                lineStyle: {
                color: 'source',
                curveness: 0.3
                }
            }
            ]
        };
        myChart.setOption(option);
    }

    // comparativeResult(){
    //     this.countriesService.getCountries().subscribe(result=>{
    //          this.countries = result;
                   
    //     })
    // }
    onComparCountry(){
        this.isLoading = true;
        // console.log(data.value);              
        if (this.selectedCountry.value.length < 3) {
            this.defaultCountry = this.selectedCountry.value;
            console.log(this.defaultCountry);
            

            if (this.defaultCountry.length == 2) {
                this.comparCountry = this.defaultCountry.toString();
                localStorage.removeItem('selected_country');
                localStorage.setItem('selected_country', this.comparCountry);
                this.mySelect.close();
            }
        }   
        this.countriesService.mapData.next(this.defaultCountry);    
        if(this.mapData.length == 2){
            this.comparCountry = this.mapData.toString();
            console.log(this.comparCountry);
            
            let data ={
                countries : this.comparCountry,
                developmentId : "1,2",
                year: this.data
            }
            this.comparativeservice.getComparative(data).subscribe(res=>{
                 this.comparativeresult = res;
                console.log(this.comparativeresult);
                
                res.filter((item: any) => {                   
                    if (!this.comparitive_countries.includes(item.country)) {
                        this.comparitive_countries.push(item.country);
                        console.log(this.comparitive_countries);
                        
                    }
                    if(item.development_type == "Present Development"){
                        if(item.ultimate_field == "Availability"){
                           this.availability.push(item);
                        }
                        if(item.ultimate_field == "Readiness"){
                            this.readiness.push(item);
                        }
                    }
                    if(item.development_type == "Prospective Development"){
                        if(item.ultimate_field == "Development Strategy"){
                            this.developmentStrategy.push(item);
                               
                        }
                        if(item.ultimate_field == "Capacity Building"){
                            this.capacityBuilding.push(item);
                        }
                    }
                });
            });
        } 
        console.log(this.defaultCountry);
    }
    ngOnDestroy(): void {
        this.mapData.unsubscribe();
    }
}