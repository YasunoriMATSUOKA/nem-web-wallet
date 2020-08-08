import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ReceiveComponent } from './page/receive/receive.component';
import { SendComponent } from './page/send/send.component';
import { HistoryComponent } from './page/history/history.component';
import { SettingsComponent } from './page/settings/settings.component';
import { AboutComponent } from './page/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'receive',
    component: ReceiveComponent,
  },
  {
    path: 'send',
    component: SendComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
