import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ViewDataService } from 'src/app/services/view-data.service';

@Component({
    selector: 'app-prospective-development',
    templateUrl: './prospective-development.component.html',
    styleUrls: ['./prospective-development.component.css'],
})
export class ProspectiveDevelopmentComponent implements OnInit {
    country_name:any;
    country_id:any;
    currentYear:any;
    governance_id:any;  
    result:any =[];
    data:any=[];
    main:any;
    taxnomy:any=[];
    entries:any=[];
    // development_type:any=[];
    Development:any=[];
    Capacity:any=[];
    data1:any=[];
    data2:any=[];
    data3:any=[];
    data4:any=[];
    data5:any=[];
    data6:any=[];
    constructor(
        private viewdataService: ViewDataService,
        private _utilities: UtilitiesService
    ){}
    ngOnInit(): void {
        this._utilities.showHeaderMenu.next(true);
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        this._utilities.governanceTypeSource.subscribe((governanceId) => {
            this.prosDev(governanceId);
        });
    }
    prosDev(governanceId:any){
        this.country_name = JSON.parse(localStorage.getItem("country_name") || '');
        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');

        this.viewdataService.getViewData(governanceId, 2, this.country_id, this.currentYear).subscribe(result =>{
                this.result =  Object.entries(result);
                   this.result.forEach((element:any, index:any)=>{
                      this.data = Object.entries(element[1]);
                      this.Capacity = this.data[1];
                      this.Development = this.data[0];                      
                   })
                    Object.entries(this.Capacity[0]);
                    this.Capacity.forEach((element1:any, index1:any)=>{
                      if(index1 == 1){
                        this.data1= Object.entries(element1);
                        
                      }
                        
                    })
                    this.data1.forEach((element:any, index:any)=> {
                            element[1];
                            // console.log(element);
                            
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
                             element1.forEach((element2:any,index2:any)=>{
                                this.data3.push(element2);
                             })              
                           })
console.log(this.data3);

                           Object.entries(this.Development[0]);
                           this.Development.forEach((element1:any, index1:any)=>{
                             if(index1 == 1){
                               this.data4= Object.entries(element1);
                            //    console.log(this.data4);
                               
                             }
                               
                           })
                           this.data4.forEach((element:any, index:any)=> {
                                   element[1];
                                //    console.log(element);
                                   
                                   this.entries = Object.entries(element[1]);
                   
                                   if(index == 0) {
                                       this.data5.push(this.entries);
                                   }
                                   if(index) {
                                       this.data5.push(this.entries);
                                   }
                                  
                                  })
                                //   console.log(this.data5);
                                  this.data5.forEach((element1:any,index1:any)=>{
                                   // console.log(element1);
                                    element1.forEach((element2:any,index2:any)=>{
                                       // console.log(element2);
                                       this.data6.push(element2);
                                    })              
                                  })    
                     })

    }
   
}
