// import { Component, OnInit } from '@angular/core';
// @Component({
//     selector: 'app-view-data',
//     templateUrl: './view-data.component.html',
//     styleUrls: ['./view-data.component.css'],
// })
// export class ViewDataComponent implements OnInit {
//     ngOnInit(): void {
//     }
   
// }


import { Component, OnInit } from '@angular/core';
// import { UtilitiesService } from 'src/app/services/utilities.service';
// import { CommonService } from 'src/app/services/common.service';
@Component({
    selector: 'app-view-data',
    templateUrl: './view-data.component.html',
    styleUrls: ['./view-data.component.css'],
})
export class ViewDataComponent implements OnInit {
    ndhs_details:any=[];
    entries:any;
    governance_id: any;
    country_id: any;
    currentYear: any;
    triggerInit: boolean = true;
    constructor() {}

    ngOnInit(): void {
      
    }
    
    getViewData(governanceId:any) {

        this.country_id = JSON.parse(localStorage.getItem("country_id") || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governance_id = JSON.parse(localStorage.getItem('governance_id') || '');

        // this._common.getViewData(governanceId, 1, this.country_id, this.currentYear).subscribe((result) => {

        //     this.entries = Object.entries(result);
        //     let viewDeatils :any;
        //     let development_type :any;
        //     let country_name :any;
        //     let ultimate_type :any;
        //     let ultimates :any = [];
        //     let taxonomy :any=[];
        //     let taxonomy1 :any=[];
        //     let indicator :any;
        //     let indicators :any=[];
        //     let taxonomyName:any;
        //     let questions:any=[];
        //     this.entries.forEach(function (element: any, index: any) {
        //         element.forEach(function (element1: any, index1: any) {
        //             if(index1 ==  0){
        //                 development_type = element1;
        //             }else{
        //                 Object.entries(element1).forEach(function (element2: any, index2: any) {
        //                     if(index2 == 0){
        //                         element2.forEach(function (element3: any, index3: any) {
        //                             if(index3 ==  0){
        //                                 ultimate_type = element3;
        //                                 viewDeatils = {...viewDeatils,development_type: development_type}
        //                             }else{
        //                                 Object.entries(element3).forEach(function (element4: any, index4: any) {
        //                                     element4.forEach(function (element5: any, index5: any) {
        //                                         if(index5 ==  0){
        //                                             taxonomyName = element5;
        //                                         }else{
        //                                             indicators = [];
        //                                             Object.entries(element5).forEach(function (element6: any, index6: any) {
        //                                                 questions = [];
        //                                                 indicator = element6[0];
        //                                                 element6[1].forEach(function (element7: any, index7: any) {
        //                                                     country_name = element7.countries_name;
        //                                                     questions.push(element7)
        //                                                 });
        //                                                 indicators.push({
        //                                                     name:indicator,
        //                                                     questions:questions
        //                                                 })
        //                                             });
        //                                         }
        //                                         if(index5 == 1 ){
        //                                             taxonomy.push({
        //                                                 name:taxonomyName,
        //                                                 indicator:indicators
        //                                             })
        //                                         }
        //                                     })
        //                                 });
        //                             }
        //                             if(index3 ==  0){
        //                                 ultimates.push({
        //                                     name:ultimate_type,
        //                                     taxonomy:taxonomy
        //                                 })
        //                             }
        //                             ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        //                             viewDeatils = {...viewDeatils,ultimates, country_name:country_name}
        //                         })
        //                     }else if(index2 == 1){
        //                         element2.forEach(function (element3: any, index3: any) {
        //                             if(index3 ==  0){
        //                                 ultimate_type = element3;
        //                                 viewDeatils = {...viewDeatils,development_type: development_type}
        //                             }else{
        //                                 Object.entries(element3).forEach(function (element4: any, index4: any) {
        //                                     element4.forEach(function (element5: any, index5: any) {
        //                                         if(index5 ==  0){
        //                                             taxonomyName = element5;
        //                                         }else{
        //                                             indicators = [];
        //                                             Object.entries(element5).forEach(function (element6: any, index6: any) {
        //                                                 questions = [];
        //                                                 indicator = element6[0];
        //                                                 element6[1].forEach(function (element7: any, index7: any) {
        //                                                     country_name = element7.countries_name;
        //                                                     questions.push(element7)
        //                                                 });
        //                                                 indicators.push({
        //                                                     name:indicator,
        //                                                     questions:questions
        //                                                 })
        //                                             });
        //                                         }
        //                                         if(index5 == 1 ){
        //                                             taxonomy1.push({
        //                                                 name:taxonomyName,
        //                                                 indicator:indicators
        //                                             })
        //                                         }
        //                                     })
        //                                 });
        //                             }
        //                             if(index3 ==  0){
        //                                 ultimates.push({
        //                                     name:ultimate_type,
        //                                     taxonomy:taxonomy1
        //                                 })
        //                             }
        //                             ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        //                             viewDeatils = {...viewDeatils,ultimates, country_name:country_name}
        //                         })
        //                     }
        //                 });
        //             }
        //         });
        //     });
        //     this.ndhs_details.push(viewDeatils);
        // });
    }

    handlePrint() {
        window.print();
    }

    ngOnDestroy(): void {
        // this._utilities.showHeaderMenu.next(false);
        // // this._utilities.governanceTypeSource.next(this.governance_id);
        // this._utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
    }

}
