import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptorService } from './helpers/error-interceptor.service';
import { JwtInterceptor } from './helpers/jwt-interceptor.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoaderInterceptor } from './helpers/loader-interceptor.service';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    ComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor,multi: true,},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }