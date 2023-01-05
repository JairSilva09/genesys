import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenesisQueuesComponent } from './genesis-queues/genesis-queues.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaginationComponent } from './genesis-queues/pagination/pagination.component';
import { ModalComponent } from './genesis-queues/modal/modal.component';
import { ModalPredefinedGroupComponent } from './genesis-queues/modal-predefined-group/modal-predefined-group.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    SideMenuComponent,
    GenesisQueuesComponent,
    PaginationComponent,
    ModalComponent,
    ModalPredefinedGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
