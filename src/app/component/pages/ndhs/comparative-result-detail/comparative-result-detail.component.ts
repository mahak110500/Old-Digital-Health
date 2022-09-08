import { object } from '@amcharts/amcharts5';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

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

	present_details: any = [];
	prospective_details: any = [];
	availability_details: any = [];
	readiness_details: any = [];
	capacity_building: any = [];
	development_strategy: any = [];
	entries: any;

	object: any = Object.keys;
	oldSelections: string[] = [];
	countrySelected: any;
	countriesToShow: any;

	toppings = new FormControl();
	triggerInit: boolean = true;

	step = 0;
	stepinner = 0;

	setStep(index: number) {
		this.step = index;
	}

	setStepInner(index: number) {
		this.stepinner = index;
	}
	dash_array: any;


	@ViewChild('mySelect') mySelect: ElementRef | any;


	constructor(
		private common: CommonService,
		private utilities: UtilitiesService,
		private mapService: CountriesService,
		private location: Location
	) { }

	public ngOnInit() {
		this.utilities.showHeaderMenu.next(true);

		$(document).ready(function () {
			$('.vertical-tab-area').toggleClass('open');
			$('.main-li li:first').addClass('active');
			$('.main-li ul li:first').addClass('activelink');
			$('.toggle-tab-button > button').on('click', function () {
				$('.vertical-tab-area').toggleClass('open');
			});
			$('.sub-category li, .parent-li').click(function () {
				$('.sub-category li, .parent-li').removeClass('activelink');
				$(this).addClass('activelink');
				var tagid = $(this).data('tag');
				$('.list').removeClass('active').addClass('hide');
				$('#' + tagid).addClass('active').removeClass('hide');
			});
		});


		this.utilities.governanceTypeSource.subscribe((governanceId) => {

			if (this.triggerInit) {
				this.dash_array = [1, 2, 3, 4, 5];

				this.ultimateId = environment.default_ultimate_id;
				this.developmentId = environment.default_development_id;

				this.common.getAllCountries().subscribe((data) => (this.countriesToShow = data));

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

				//For getting the search countries data
				this.mapService.getCountries().subscribe((data) => {
					let country = data;

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
					// console.log(result);

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
				this.comaparativeViewDeatils();
			}

		});

	}

	//Search Countires data
	onSelected() {
		let temp = this.mySelections.filter((obj: string) => {
			return this.oldSelections.indexOf(obj) == -1;
		});
		this.countries = [];
		// console.log(this.countries);


		if (this.toppings.value.length < 3) {
			this.mySelections = this.toppings.value;

			if (this.mySelections.length == 2) {
				this.countries = this.mySelections.toString();
				this.topCountriesChart();
				this.InformationReport();
				localStorage.removeItem('selected_country');
				localStorage.setItem('selected_country', this.countries);
				this.mySelect.close();
			}
		} else {
			if (this.toppings.value.length == 3) {
				let index = this.toppings.value.indexOf(temp[0]);
				if (index == 0) {
					this.toppings.value.pop();
				} else {
					this.toppings.value.shift();
				}
				this.mySelections = this.toppings.value;
				// this.oldSelections = this.mySelections;
				if (this.mySelections.length == 2) {
					this.countries = this.mySelections.toString();
					this.topCountriesChart();
					this.InformationReport();

					// let defaultCountry = {
					//     countries: this.countrySelected,
					// };

					// this.utilities.emitDefaultCountries.next(
					//     defaultCountry
					// );

					localStorage.removeItem('selected_country');
					localStorage.setItem('selected_country', this.countries);
					this.mySelect.close();
				}
			}
			this.toppings.setValue(this.mySelections);
		}

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

	ultimateSelection(development_id: number, ultimate_id: number) {
		this.developmentId = development_id;
		this.ultimateId = ultimate_id;
		this.InformationReport();

	}

	togglePresent(event: any) {
		$('#present_development li:first').addClass('active');
		$('#present_development ul li:first').addClass('activelink');
		this.ultimateSelection(1, 2);
	}

	toggleProspective(event: any) {
		$('#prospective_development li:first').addClass('active');
		$('#prospective_development ul li:first').addClass('activelink');
		this.ultimateSelection(2, 4);

	}

	dropDown2() {
		$('.toggleSubmenu2').next('ul').toggleClass('show');
	}

	dropDown1() {
		$('.toggleSubmenu1').next('ul').toggleClass('show');
	}

	isValue: number = 0;

	toggle(num: number) {
		this.isValue = num;
	}

	//GO BACK
	previousPage() {
		this.location.back();
	}

	//Comparative overview Chart
	comaparativeViewDeatils() {
		this.present_details = [];
		this.prospective_details = [];

		let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
		let selectedYear = this.year;
		if (selected_years && selected_years.length == 2) {
			selectedYear = selected_years.toString();
		}
		let data = {
			countries: this.countries,
			governanceId: this.governance,
		}
		console.log(data);
		

		this.common.getComparativeViewDetails(data).subscribe((res) => {

			this.entries = Object.entries(res);
			console.log(this.entries);

			let present_detail = this.formate_data(this.entries[0]);
			console.log(present_detail);

			let prospective_detail = this.formate_data(this.entries[1]);
			console.log(prospective_detail);

			this.present_details.push(present_detail);
			console.log(this.present_details);

			this.prospective_details.push(prospective_detail);
			console.log(this.prospective_details);

			this.availability_details = this.present_details[0].ultimates[0].taxonomy;
			this.readiness_details = this.present_details[0].ultimates[1].taxonomy;
			this.capacity_building = this.prospective_details[0].ultimates[0].taxonomy;
			this.development_strategy = this.prospective_details[0].ultimates[1].taxonomy;
		});


	}

	formate_data(data: any) {

		let viewDeatils: any;
		let development_type: any;
		let entries = [];
		let country_name: any;
		let ultimate_type: any;
		let ultimates: any = [];
		let taxonomy: any = [];
		let taxonomy1: any = [];
		let indicator: any;
		let indicators: any = [];
		let taxonomyName: any;
		let questions: any = [];
		let countries: any = [];
		let indicator_score: any = [];
		entries.push(data);

		entries.forEach(function (element: any, index: any) {
			element.forEach(function (element1: any, index1: any) {
				if (index1 == 0) {
					development_type = 1;

				} else {
					Object.entries(element1).forEach(function (element2: any, index2: any) {
						if (index2 == 0) {
							element2.forEach(function (element3: any, index3: any) {

								if (index3 == 0) {
									ultimate_type = element3,
										viewDeatils = { ...viewDeatils, development_type: development_type }
										

								} else {
									Object.entries(element3).forEach(function (element4: any, index4: any) {
										element4.forEach(function (element5: any, index5: any) {

											if (index5 == 0) {
												taxonomyName = element5;
											} else {
												indicators = [];
												Object.entries(element5).forEach(function (element6: any, index6: any) {
													questions = [];
													indicator = element6[0];
													countries = [];
													indicator_score = [];
													let actual_score1: any;
													// console.log(actual_score1);
													let actual_score2: any;
													let question_status1: any;
													let question_status2: any;
													let indicator_score1: any;
													let indicator_score2: any;
													let country_percantag1: any;
													let country_percantag2: any;
													Object.entries(element6[1]).forEach(function (element7: any, index7: any) {
														let question_name: any;
														element7.forEach(function (element8: any, index8: any) {

															if (index8 == 0) {
																question_name = element8;
															} else {
																element8.forEach(function (element9: any, index9: any) {
																	// console.log(element9);

																	if (index9 == 0) {
																		question_status1 = element9.status;

																		actual_score1 = element9.actual_score;
																		// console.log(element9.actual_score);
																		// console.log(actual_score1);

																		indicator_score1 = element9.indicator_score;


																	} else {
																		question_status2 = element9.status;

																		actual_score2 = element9.actual_score;

																		indicator_score2 = element9.indicator_score;

																	}
																	if (!countries.includes(element9.c_name)) {
																		countries.push(element9.c_name);
																	}
																})
															}
														});

														let ques = {
															name: question_name,
															question_status1: question_status1,
															question_status2: question_status2
														}
														questions.push(ques);

													});

													country_percantag1 = Math.round(Math.round((actual_score1 / indicator_score1) * 100) / 20);

													country_percantag2 = Math.round(Math.round((actual_score2 / indicator_score2) * 100) / 20);
													let score = {
														country_1: countries[0],
														country_2: countries[1],
														indicator_score1: indicator_score1,
														actual_score1: actual_score1,
														indicator_score2: indicator_score2,
														actual_score2: actual_score2,
														country_percantag1: country_percantag1,
														country_percantag2: country_percantag2
													}
													indicator_score.push(score);
													// console.log(indicator_score);

													indicators.push({
														name: indicator,
														questions: questions,
														countries: countries,
														score: indicator_score
													})
												});
											}

											if (index5 == 1) {
												taxonomy.push({
													name: taxonomyName,
													indicator: indicators
												})
											}
										})
									});
								}
								if (index3 == 0) {
									ultimates.push({
										name: ultimate_type,
										taxonomy: taxonomy
									})
								}
								ultimates.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
								viewDeatils = { ...viewDeatils, ultimates }

							})
						} else if (index2 == 1) {
							element2.forEach(function (element3: any, index3: any) {
								if (index3 == 0) {
									ultimate_type = element3;
									viewDeatils = { ...viewDeatils, development_type: development_type }
								} else {
									Object.entries(element3).forEach(function (element4: any, index4: any) {
										element4.forEach(function (element5: any, index5: any) {
											if (index5 == 0) {
												taxonomyName = element5;
											} else {
												indicators = [];
												Object.entries(element5).forEach(function (element6: any, index6: any) {
													questions = [];
													indicator = element6[0];
													countries = [];
													indicator_score = [];
													let actual_score1 = 0;
													let actual_score2 = 0;
													let question_status1: any;
													let question_status2: any;
													let indicator_score1: any;
													let indicator_score2: any;
													let country_percantag1: any;
													let country_percantag2: any;
													Object.entries(element6[1]).forEach(function (element7: any, index7: any) {
														let question_name: any;
														element7.forEach(function (element8: any, index8: any) {
															if (index8 == 0) {
																question_name = element8;
															} else {
																element8.forEach(function (element9: any, index9: any) {
																	if (index9 == 0) {
																		question_status1 = element9.status;
																		actual_score1 += element9.actual_score;
																		indicator_score1 = element9.indicator_score;
																	} else {
																		actual_score2 += element9.actual_score;
																		question_status2 = element9.status;
																		indicator_score2 = element9.indicator_score;
																	}
																	if (!countries.includes(element9.c_name)) {
																		countries.push(element9.c_name);
																	}
																})
															}
														});

														let ques = {
															name: question_name,
															question_status1: question_status1,
															question_status2: question_status2
														}
														questions.push(ques);
													});

													country_percantag1 = Math.round(Math.round((actual_score1 / indicator_score1) * 100) / 20);
													country_percantag2 = Math.round(Math.round((actual_score2 / indicator_score2) * 100) / 20);
													let score = {
														country_1: countries[0],
														country_2: countries[1],
														indicator_score1: indicator_score1,
														actual_score1: actual_score1,
														indicator_score2: indicator_score2,
														actual_score2: actual_score2,
														country_percantag1: country_percantag1,
														country_percantag2: country_percantag2
													}
													indicator_score.push(score);
													indicators.push({
														name: indicator,
														questions: questions,
														countries: countries,
														score: indicator_score
													})
												});
											}
											if (index5 == 1) {
												taxonomy1.push({
													name: taxonomyName,
													indicator: indicators
												})
											}
										})
									});
								}
								if (index3 == 0) {
									ultimates.push({
										name: ultimate_type,
										taxonomy: taxonomy1
									})
								}
								ultimates.sort(function (a: any, b: any) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
								viewDeatils = { ...viewDeatils, ultimates }
							})
						}
					});

				}
			});
		});
		return viewDeatils;

	}



}
