import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashBoardComponent } from "./component/dash-board/dash-board.component";
import { HomeComponent } from "./component/home/home.component";
import { LoggedInGuard } from "./_guard/logged.guard";
import { RemoteComponent } from "./component/remote/remote.component";
import { AbsorptionComponent } from "./component/absorption/absorption.component";
import { ReprintComponent } from "./component/reprint/reprint.component";
import { ReportSubscriptionComponent } from "./component/report-subscription/report-subscription.component";
import { GetfileComponent } from "./component/getfile/getfile.component";
import { LoginstatusComponent } from "./component/loginstatus/loginstatus.component";
import { PerformanceTestComponent } from "./component/performance-test/performance-test.component";
import { PreviewPdfComponent } from "./component/preview-pdf/preview-pdf.component";

const appRoutes: Routes = [
    { path: 'dash-board', component: DashBoardComponent, canActivate: [LoggedInGuard] },
    { path: 'absorption', component: AbsorptionComponent, canActivate: [LoggedInGuard] },
    { path: 'remote', component: RemoteComponent, canActivate: [LoggedInGuard] },
    { path: 'reprint', component: ReprintComponent, canActivate: [LoggedInGuard] },
    { path: 'previewPDF', component: PreviewPdfComponent, canActivate: [LoggedInGuard] },
    { path: 'subscriptionreport', component: ReportSubscriptionComponent, canActivate: [LoggedInGuard] },
    { path: 'getfile', component: GetfileComponent, canActivate: [LoggedInGuard] },
    { path: 'loginstatus', component: LoginstatusComponent, canActivate: [LoggedInGuard] },
    { path: 'performanceTest', component: PerformanceTestComponent, canActivate: [LoggedInGuard] },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})


export class AppRoutingModule { }