import { object } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ViewDataService } from 'src/app/services/view-data.service';
@Component({
    selector: 'app-view-data',
    templateUrl: './view-data.component.html',
    styleUrls: ['./view-data.component.css'],
})
export class ViewDataComponent implements OnInit {
    country_id:any;
    currentYear:any;
    governance_id:any;
    entries:any;
    added:any =[];
    country_name:any;
    data:any;
    data3:any=[];
    data1:any=[];
    data2:any=[];
    result:any=[];
    Readiness:any=[];
    development_type :any;
    details:any;
    viewData:any;
    Availability:any=[];
    data4:any=[];
    main:any=[];
    constructor(
        private viewdataService : ViewDataService,
        private _utilities: UtilitiesService){}
    
    ngOnInit(): void {
        this._utilities.showHeaderMenu.next(true);
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
                this.ViewData(governanceId);
        });
    }
    ViewData(governanceId:number){
console.log(governanceId);

        this.country_name = JSON.parse(localStorage.getItem("country_name") || '');
        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');

     this.viewdataService.getViewData(governanceId, 1, this.country_id, this.currentYear).subscribe(result =>{                    
    this.result =  Object.entries(result);
    this.result.forEach((element:any, index:any) => {
            if(index == 0){
                this.development_type = element
            }
        });              
        this.result.forEach((element:any, index:any)=>{
            this.data = element[1];
           this.Availability = Object.entries(this.data.Availability)
           this.Availability.forEach((element:any, index:any)=> {
            element[1];
            this.entries = Object.entries(element[1]);

            if(index==0){
                this.data1.push(this.entries); 
            }
            if(index){
                this.data1.push(this.entries); 
            }
         console.log(this.data1);
        
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
                        // this.taxnomy = element3
                    }
                   
                })                   
            })
            })                
     });
    
}
handlePrint() {
    window.print();
}

}