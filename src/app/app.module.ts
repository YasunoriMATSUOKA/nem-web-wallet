import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { NEMLibrary, NetworkTypes } from 'nem-library';
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);

import { NgxKjuaModule } from 'ngx-kjua';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { ViewHomeComponent } from './view/home/home.component';
import { ReceiveComponent } from './page/receive/receive.component';
import { ViewReceiveComponent } from './view/receive/receive.component';
import { SendComponent } from './page/send/send.component';
import { ViewSendComponent } from './view/send/send.component';
import { HistoryComponent } from './page/history/history.component';
import { AboutComponent } from './page/about/about.component';
import { SettingsComponent } from './page/settings/settings.component';
import { ViewSignInComponent } from './view/common/sign-in/sign-in.component';
import { ViewHeaderComponent } from './view/common/header/header.component';
import { ViewFooterComponent } from './view/common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewHomeComponent,
    ReceiveComponent,
    ViewReceiveComponent,
    SendComponent,
    ViewSendComponent,
    HistoryComponent,
    AboutComponent,
    SettingsComponent,
    ViewSignInComponent,
    ViewHeaderComponent,
    ViewFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxKjuaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
