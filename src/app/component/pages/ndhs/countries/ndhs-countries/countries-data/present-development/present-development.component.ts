import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ViewDataService } from 'src/app/services/view-data.service';


@Component({
    selector: 'app-present-development',
    templateUrl: './present-development.component.html',
    styleUrls: ['./present-development.component.css'],
})
export class PresentDevelopmentComponent implements OnInit {
    country_name:any;
    country_id:any;
    currentYear:any;
    governance_id:any;  
    result:any =[];
    data:any=[];
    main:any;
    taxnomy:any=[];
    entries:any=[];
    development_type:any=[];
    Readiness:any=[];
    Availability:any=[];
    data1:any=[];
    data2:any=[];
    data3:any=[];
    data4:any=[];
    data5:any=[];
    constructor(
        private viewdataService: ViewDataService,
        private _utilities: UtilitiesService
    ){}
    ngOnInit(): void {
        this._utilities.showHeaderMenu.next(true);
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
            this.presentDev(governanceId);
        });
      
    }
    presentDev(governanceId:any){
        this.country_name = JSON.parse(localStorage.getItem("country_name") || '');
        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');

        this.viewdataService.getViewData(governanceId, 1, this.country_id, this.currentYear).subscribe(result =>{
                this.result =  Object.entries(result);
                   
               this.result.forEach((element:any, index:any)=>{
                this.data = element[1];
               this.Availability = Object.entries(this.data.Availability)
               console.log(this.Availability);
               
               this.Availability.forEach((element:any, index:any)=> {
                element[1];
                this.entries = Object.entries(element[1]);

                if(index == 0) {
                    this.data1.push(this.entries);
                }
                if(index) {
                    this.data1.push(this.entries);
                }
               
               })
               console.log(this.data1);
               this.data1.forEach((element1:any,index1:any)=>{
                 element1.forEach((element2:any,index2:any)=>{
                    this.data4.push(element2);
                 })              
               })

                    console.log(this.data4);
                    this.Readiness = Object.entries(this.data.Readiness);
                    this.Readiness.forEach((element:any, index:any)=> {
                        element[1];
                        this.entries = Object.entries(element[1]);

                        if(index == 0) {
                            this.data2.push(this.entries);
                        }
                        if(index) {
                            this.data2.push(this.entries);
                        }
                       })
                       console.log(this.data2);
                       this.data2.forEach((element1:any,index1:any)=>{
                        // console.log(element1);
                         element1.forEach((element2:any,index2:any)=>{
                            // console.log(element2);
                            this.data3.push(element2);
                         })              
                       })
                        console.log(this.data3);

                Object.entries(this.data).forEach((element2:any, index2:any)=>{
                    this.main= element2[0]          
                    element2.forEach((element3:any,index3:any)=>{
                        if(index3 == 1){
                            // console.log(element3);
                            this.taxnomy = element3
                        }
                       
                    })                   
                })
                })                
        })

    }
   handlePrint(){
    window.print()
   }
}
