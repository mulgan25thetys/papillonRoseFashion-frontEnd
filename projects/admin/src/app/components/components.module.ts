import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { CustomerComponent } from './customer/customer.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { MenusComponent } from './menus/menus.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    CustomerComponent,
    FooterComponent,
    NavbarProfileComponent,
    NotificationsComponent,
    SearchComponent,
    MenusComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [CustomerComponent, FooterComponent, MenusComponent, NavbarProfileComponent, NotificationsComponent
  ,SearchComponent]
})
export class ComponentsModule { }
