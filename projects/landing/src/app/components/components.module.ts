import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [HeaderComponent,FooterComponent,BannerComponent]
})
export class ComponentsModule { }
