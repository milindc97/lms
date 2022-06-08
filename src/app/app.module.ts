import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { JwtInterceptorInterceptor } from './_helper/other/jwt-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from './_helper/other/error-interceptor.interceptor';
import { PresenceService } from './_helper/other/presence.service';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ChartsModule } from 'ng2-charts';
import { AppHeaderComponent } from './masters/app-header/app-header.component';
import { AppFooterComponent } from './masters/app-footer/app-footer.component';
import { AppMenuComponent } from './masters/app-menu/app-menu.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
const config: SocketIoConfig = { url: environment.baseHost, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage:'English - EN'
    }),
    GaugeChartModule,
    SocketIoModule.forRoot(config),
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 4,
      innerStrokeWidth: 0,
      responsive:true,
      outerStrokeColor: "#049dff",
      animationDuration: 300,
      showBackground:true,
      backgroundPadding:-4,
      showSubtitle:false,
      backgroundColor:'#34495E',
      titleColor:'#ffffff',
      titleFontSize:'10',
      unitsColor:'#ffffff'
    }),
    NgbProgressbarModule
  ],
  providers: [
    PresenceService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}