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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { ViewHomeComponent } from './view/home/home.component';
import { ViewSignInComponent } from './view/common/sign-in/sign-in.component';
import { ViewHeaderComponent } from './view/common/header/header.component';
import { ViewFooterComponent } from './view/common/footer/footer.component';
import { ReceiveComponent } from './page/receive/receive.component';
import { SendComponent } from './page/send/send.component';
import { HistoryComponent } from './page/history/history.component';
import { AboutComponent } from './page/about/about.component';
import { SettingsComponent } from './page/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewHomeComponent,
    ViewSignInComponent,
    ViewHeaderComponent,
    ViewFooterComponent,
    ReceiveComponent,
    SendComponent,
    HistoryComponent,
    AboutComponent,
    SettingsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
