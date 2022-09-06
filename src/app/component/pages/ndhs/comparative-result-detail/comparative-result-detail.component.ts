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
    taxonomy_name:any;
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
        let option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
              }
            ]
          };
        this.BarChartOptions = option;


    }

}
