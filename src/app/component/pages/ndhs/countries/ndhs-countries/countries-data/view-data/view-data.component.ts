import { object } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
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
    data1:any;
    data2:any;
    ndhs_details:any=[];
    development_type :any;
    details:any;
    constructor(private viewdataService : ViewDataService){}
    ngOnInit(): void {
        this.ViewData();
    }
    ViewData(){
        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');
     this.viewdataService.getViewData(this.governance_id, 1, this.country_id, this.currentYear).subscribe(result =>{
      
        this.entries = Object.entries(result);
        console.log(this.entries);
        
        this.entries.forEach((element:any, index:any) => {
            if(index == 0){
                this.development_type = element
            }
        });  
        let data = Object.entries(this.development_type)
        data.forEach((element1:any, index1:any) => {
            
            if(index1 == 1){ 
                // console.log(element1);
                   
                 Object.entries(element1).forEach((element2:any, index2:any) =>{
                    if(index2 == 1){
                        // console.log(element2);
                        
                        element2.forEach((element3:any, index3:any)=> {
                            if(index3 == 1){
                                console.log(element3);
                                
                                this.data1 = element3.Availability;
                                this.data1 = Object.entries(this.data1);
                                
                                this.data2 = element3.Readiness;
                                this.data2 = Object.entries(this.data2);
                                console.log(this.data1);
                                console.log(this.data2);
                               let datamain = Object.entries(element3);
                               this.data1.forEach((element4:any, index4:any) => {
                                let data = Object.entries(element4);
                                this.details = data[1];
                                console.log(this.details);
                                
                                
                               })
                               datamain.forEach((element4:any, index4:any)=>{
                                if(index4 == 0){
                                    element4 = Object.entries(element4);
                                    element4.forEach((element5:any, index5:any)=> {
                                        if(index5 == 1){
                                            //  this.data1 = element5                                                                                        
                                        }
                                        
                                    })
                                    
                                }
                                if(index4 == 1){
                                    element4 = Object.entries(element4);
                                    element4.forEach((element5:any, index5:any)=> {
                                        if(index5 == 1){    
                                            if(element5 != 1 )    {
                                                this.data2 = element5
                                                // console.log(this.data2); 
                                            }                                    
                                                                                       
                                        }
                                        
                                    })
                                    
                                }
                                
                               })
                            }
                            
                        })
                        
                    }
                    
                 })
                         
            
            }
           
        });       
     });
     
    }
   
}

