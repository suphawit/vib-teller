import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, } from '@angular/http'
import { HashLocationStrategy, LocationStrategy, DatePipe } from "@angular/common";
import { NgxPaginationModule } from 'ngx-pagination';

import { API } from './core/API';
import { LoggedInGuard } from './_guard/logged.guard';
import { UserStore } from './store/user.store';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// IMPORT ROUTING MODULE
import { AppRoutingModule } from "./app-routing.module";

// IMPORT LIB
import { ModalModule } from "ng2-bs4-modal/lib/ng2-bs4-modal.module";
import { OrderModule } from 'ngx-order-pipe';

// IMPORT SERVICE
import { SocketService } from "./_service/socket.service";
import { UserService } from "./_service/user.service";
import { DataService } from "./_service/data.service";
import { HardwareService } from "./_service/hardware.service";
import { NotificationService } from "./_service/notification.service";
import { LogService } from './_service/log.service';
import { PreviewPdfService } from './_service/preview-pdf.service';
import { MasterDataService } from './_service/master-data.service';

// IMPORT COMPONENT
import { AppComponent } from './app.component';
import { LoginComponent } from "./component/login/login.component";
import { TransactionComponent } from "./component/transaction/transaction.component";
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { TellerProfileComponent } from './component/teller-profile/teller-profile.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { ExchangeRateComponent } from './component/exchange-rate/exchange-rate.component';
import { BannerHomeComponent } from './component/banner-home/banner-home.component';
import { HomeComponent } from './component/home/home.component';
import { ApproveSubscriptionComponent } from './component/approve-subscription/approve-subscription.component';
import { RemoteComponent } from './component/remote/remote.component';
import { AbsorptionComponent } from './component/absorption/absorption.component';
import { ReprintComponent } from './component/reprint/reprint.component';
import { ReportSubscriptionComponent } from './component/report-subscription/report-subscription.component';
import { GetfileComponent } from './component/getfile/getfile.component';
import { LoginstatusComponent } from './component/loginstatus/loginstatus.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { FixedPluginComponent } from './component/shared/fixedplugin/fixedplugin.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { PerformanceTestComponent } from './component/performance-test/performance-test.component';
import { PreviewPdfComponent } from './component/preview-pdf/preview-pdf.component';
import { ConstantVIB } from './share/app.constant'




@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TransactionComponent,
        NavigationBarComponent,
        TellerProfileComponent,
        DashBoardComponent,
        ExchangeRateComponent,
        BannerHomeComponent,
        HomeComponent,
        ApproveSubscriptionComponent,
        RemoteComponent,
        AbsorptionComponent,
        ReprintComponent,
        ReportSubscriptionComponent,
        GetfileComponent,
        LoginstatusComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        PerformanceTestComponent,
        PreviewPdfComponent,
        FixedPluginComponent,
        PaginationComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        ModalModule,
        HttpModule,
        FormsModule,
        NgxPaginationModule,
        PdfViewerModule,
        OrderModule,
    ],
    providers: [
        SocketService,
        NotificationService,
        UserService,
        API,
        LoggedInGuard,
        UserStore,
        DataService,
        HardwareService,
        DatePipe,
        LogService,
        PreviewPdfService,
        MasterDataService,
        ConstantVIB,
        { provide: LocationStrategy, useClass: HashLocationStrategy },

    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
