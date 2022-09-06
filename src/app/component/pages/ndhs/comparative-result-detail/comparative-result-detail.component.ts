import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { data } from 'jquery';
import { CommonService } from 'src/app/services/common.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';



@Component({
	selector: 'app-comparative-result-detail',
	templateUrl: './comparative-result-detail.component.html',
	styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent implements OnInit {
	BarChartOptions: any;
	taxonomy_id: number = 0;
	taxonomy_name: any;
	governanceId: any;
	year: any;
	developmentId: any;
	ultimateId: any;
	ultimate_field: any;
	governance: any;
	countries: any;
	comparative_report: any;
	development_name: any;
	countries_array: any = [];
	ultimate_type: any;
	default_country_list: any;
	mySelections: any = [];
	country_list: any;
	countries_2021: any;
    countries_2022: any;
    countriesData: any;




	toppings = new FormControl();
	triggerInit: boolean = true;


	constructor(
		private common: CommonService,
		private utilities: UtilitiesService,
		private mapService: CountriesService
	) {}

	public ngOnInit() {
		this.utilities.showHeaderMenu.next(true);

		this.utilities.governanceTypeSource.subscribe((governanceId) => {
			if (this.triggerInit) {
				this.ultimateId = environment.default_ultimate_id;
				this.developmentId = environment.default_development_id;

				this.utilities.yearSource.subscribe((message: any) => {
					this.year = message;
					if (localStorage.getItem("selected_country")) {
						this.countries = localStorage.getItem("selected_country");
					} else {
						if (this.year == 2022) {
							this.countries = environment.default_country_2022;
						} else {
							this.countries = environment.default_country_2021;
						}
					}
				})

				this.utilities.governanceTypeSource.subscribe((message: any) => {
					this.governance = message;
				})

				let data = {
					year: this.year
				};

				// this.common.getExistingCountries(data).subscribe((result) => {
				// 	console.log(result);
				// 	this.country_list = result;
				// })

				this.mapService.getCountries().subscribe((data) => {
					let country = data;
					console.log(country);
					
					this.countries_2021 = country['2021'];
					this.countries_2022 = country['2022'];
					
					
					this.countriesData = {
						...{ '2021': this.countries_2021 },
						...{ '2022': this.countries_2022 },
					};
				
				});

				

				let default_country = {
					countries: this.countries
				}



				this.common.getdefaultCountry(default_country).subscribe((result) => {
					console.log(result);

					this.default_country_list = result;

					let selectedOptions: any = [];
					this.mySelections = [];
					result.forEach((element: any, index: any) => {
						selectedOptions.push(element.country_id)

						this.mySelections.push(element.country_id);


					});


				})

				this.topCountriesChart();
				this.InformationReport();
			}




		})

	}

	topCityChart(taxonomy_id: number) {
		console.log(taxonomy_id);

		this.taxonomy_id = taxonomy_id;
		this.topCountriesChart();
	}

	InformationReport() {
		let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
		let selectedYear = this.year;
		if (selected_years && selected_years.length == 2) {
			selectedYear = selected_years.toString();
		}

		let data = {
			countries: this.countries,
			developmentId: this.developmentId,
			governanceId: this.governance,
			ultimateId: this.ultimateId,
		}
		// console.log(data);
		this.countries_array = [];
		// console.log(this.countries_array);



		this.common.getInformationReportData(data).subscribe((result) => {
			this.comparative_report = result;


			this.development_name = result[0].development_type;

			result.filter((item: any, index: any) => {
				this.ultimate_type = item.ultimate_field;

				if (index == 0) {
					this.taxonomy_id = item.taxonomy_id;

					this.topCountriesChart();
				}
				if (!this.countries_array.includes(item.country)) {
					this.countries_array.push(item.country);
				}

			})
		});
	}


	topCountriesChart() {
		let taxonomy: any;
		if (this.taxonomy_id == 0) {
			taxonomy = (this.governance == 1) ? environment.default_taxonomy_general : environment.default_taxonomy_digital;
		} else {
			taxonomy = this.taxonomy_id;
		}
		let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
		let selectedYear = this.year;
		if (selected_years && selected_years.length == 2) {
			selectedYear = selected_years.toString();
		}

		let data = {
			developmentId: this.developmentId,
			governanceId: this.governance,
			taxonomyId: taxonomy,
			ultimateId: this.ultimateId,
			year: "2021"
		};

		this.common.getTopCountriesData(data).subscribe((res) => {
			// console.log(res);

			let taxonomy_name: any;
			let source: any = []; //Array of label and availability
			let new_array: any = [];

			res.forEach((element: any, index: any) => {

				this.ultimate_field = element.ultimate_field; //Healthcare Governance 
				taxonomy_name = element.taxonomy_name; //Availability


				if (index == 0) {
					new_array.push('label', element.ultimate_field);
					source.push(new_array)
					new_array = [];
				}
				new_array.push(element.country_name, element.score);
				source.push(new_array)
				new_array = [];

			});


			let option = {
				title: {
					text: taxonomy_name,
					textStyle: {
						fontSize: 10
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
							borderRadius: [5, 5, 0, 0], // Specify the border radius
						},
					},
				],

			}
			this.BarChartOptions = option;

		})


	}



}
