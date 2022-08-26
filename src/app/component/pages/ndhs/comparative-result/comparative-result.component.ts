import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as echarts from 'echarts';
import * as am5 from '@amcharts/amcharts5';
import graph from 'src/assets/data/network2.json'
import * as am5map from '@amcharts/amcharts5/map';
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
export class ComparativeResultComponent implements OnInit, AfterViewInit {
    @ViewChild('main') main: ElementRef | any;
    chartMap:any
    data:any;
    root:any;
    networkData:any;
    year:any;
    countries:any=[];
    constructor(
        private countriesService: CountriesService,
        private _utilities: UtilitiesService 
    ){}
    ngOnInit(): void {
        this._utilities.yearSource.subscribe(res=>{
            this.data = res;
            this.comparativeResult();
        })   
        
    }
    ngAfterViewInit(): void {
    this.barGraph();
    this.mapGraph();


    }
    mapGraph(){
        this.root = am5.Root.new('chartdiv');
        let pointSeries = this.chartMap.series.push(
            am5map.MapPointSeries.new(this.root, {
              polygonIdField: "country"
            })
          );
          
          pointSeries.data.setAll([{
            country: "CA",
            name: "Canada"
          }, {
            country: "US",
            name: "United States"
          },{
            country: "MX",
            name: "Mexico"
          }]);
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

    comparativeResult(){
        this.countriesService.getCountries().subscribe(result=>{
            let year = Object.entries(result);
            console.log(year);
            year.forEach((element:any, index:any)=> {
                if(element[0]== this.data){
                    this.countries = element[1];
                    console.log(this.countries);
                }                
            })            
        })
    }
            
}

