import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-comparative-result-detail',
    templateUrl: './comparative-result-detail.component.html',
    styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent {
    BarChartOptions: any;
    taxonomy_id:number = 0;
    governanceId: any;
    year: any;
    developmentId: any;
    ultimateId: any;
    ultimate_field: any;


    constructor(private common: CommonService) { }

    topCityChart(taxonomy_id: number) {
        console.log(taxonomy_id);
        
        this.taxonomy_id = taxonomy_id;
        this.topCountriesChart();
    }


    topCountriesChart() {
        let taxonomy: any;
        console.log(taxonomy);
        

        if (this.taxonomy_id == 0) {
            console.log(this.taxonomy_id);
            
            taxonomy = (this.governanceId == 1) ? environment.default_taxonomy_general : environment.default_taxonomy_digital;
        } else {
            taxonomy = this.taxonomy_id;
        }

        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if (selected_years && selected_years.length == 2) {
            selectedYear = selected_years.toString();
        }

        let data = {
            taxonomyId: taxonomy,
            developmentId: this.developmentId,
            ultimateId: this.ultimateId,
            governanceId: this.governanceId,
            year: selectedYear
        };
        

        let self = this;
        this.common.getTopCountriesData(data).subscribe((result) => {
            let taxonomy_name: any;
            let source: any = [];
            let re_aaray: any = [];
            result.forEach(function (element: any, index: any) {
                self.ultimate_field = element.ultimate_field;
                taxonomy_name = element.taxonomy_name;
                if (index == 0) {
                    re_aaray.push('label', element.ultimate_field);
                    source.push(re_aaray)
                    re_aaray = [];
                }
                re_aaray.push(element.country_name, element.score);
                source.push(re_aaray)
                re_aaray = [];
            });

            let option = {
                title: {
                    text: taxonomy_name,
                    textStyle: {
                        fontSize: 12
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: 0,
                    top: 0, 
                    textStyle: {
                        fontSize: 11
                    }
                },
                tooltip: {},
                dataset: {
                    source: source,
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                      interval: 0,
                      rotate: 30,
                      textStyle: {
                        fontSize: 10
                    }
                    },
                   
                },
                yAxis: {},
                
                series: [
                    {
                      type: 'bar',
                      itemStyle: {
                        borderRadius : [6, 6, 0, 0], // Specify the border radius
                      },
                    },
                  ],
                grid: { containLabel: true },
            };
            this.BarChartOptions = option;



        })



    }

}
