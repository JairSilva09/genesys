import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { GenesysInterceptorService } from './services/genesys-interceptor.service';
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
import { TableAgentsComponent } from './genesis-queues/table-agents/table-agents.component';
import { TablePredefinedGroupComponent } from './genesis-queues/table-predefined-group/table-predefined-group.component';
import { TableModifyQueuesComponent } from './genesis-queues/table-modify-queues/table-modify-queues.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSortModule} from '@angular/material/sort';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    SideMenuComponent,
    GenesisQueuesComponent,
    PaginationComponent,
    ModalComponent,
    ModalPredefinedGroupComponent,
    TableAgentsComponent,
    TablePredefinedGroupComponent,
    TableModifyQueuesComponent,
    LoginComponent
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
    MatChipsModule,
    MatSortModule       
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenesysInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
