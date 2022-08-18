import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { LayoutComponent } from './component/common/layout/layout.component';
import { LayoutInnerComponent } from './component/common/layout-inner/layout-inner.component';
import { NdhsMapComponent } from './component/pages/ndhs/ndhs-map/ndhs-map.component';
import { NdhsCountriesComponent } from './component/pages/ndhs/countries/ndhs-countries/ndhs-countries.component';
import { ViewDataComponent } from './component/pages/ndhs/countries/ndhs-countries/countries-data/view-data/view-data.component';
import { PresentDevelopmentComponent } from './component/pages/ndhs/countries/ndhs-countries/countries-data/present-development/present-development.component';
import { ProspectiveDevelopmentComponent } from './component/pages/ndhs/countries/ndhs-countries/countries-data/prospective-development/prospective-development.component';
import { ComparativeResultComponent } from './component/pages/ndhs/comparative-result/comparative-result.component';
import { ComparativeResultDetailComponent } from './component/pages/ndhs/comparative-result-detail/comparative-result-detail.component';
import { ComparativeOverviewComponent } from './component/pages/ndhs/comparative-overview/comparative-overview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: { title: 'home' },
            },
        ],
    },
    {
        path: '',
        component: LayoutInnerComponent,
        children: [
            {
                path: 'ndhs-map',
                component: NdhsMapComponent,
                data: { title: 'NDHS-Map' },
            },
            {
                path: 'ndhs-countries',
                component: NdhsCountriesComponent,
                data: { title: 'Countries' },
            },
            {
                path: 'view-data',
                component: ViewDataComponent,
                data: { title: 'View-Data' },
            },
            {
                path: 'present-development',
                component: PresentDevelopmentComponent,
                data: { title: 'Present-Development' },
            },
            {
                path: 'prospective-development',
                component: ProspectiveDevelopmentComponent,
                data: { title: 'Prospective-Development' },
            },
            {
                path: 'comparative-result',
                component: ComparativeResultComponent,
                data: { title: 'Comparative-Result' },
            },
            {
                path: 'comparative-result-detail',
                component: ComparativeResultDetailComponent,
                data: { title: 'Comparative-Result-Detail' },
            },
            {
                path: 'comparative-overview',
                component: ComparativeOverviewComponent,
                data: { title: 'Comparative-Overview' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
