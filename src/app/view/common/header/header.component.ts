import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class ViewHeaderComponent implements OnInit {
  @Output() appSignOut: EventEmitter<never>;

  headerTitle: string = 'NEM Web Wallet';
  menues = [
    {
      icon: 'home',
      label: 'ホーム',
      link: '/',
    },
    {
      icon: 'qr_code',
      label: '受取',
      link: '/receive',
    },
    {
      icon: 'send',
      label: '送信',
      link: '/send',
    },
    {
      icon: 'list',
      label: '履歴',
      link: '/history',
    },
    {
      icon: 'settings',
      label: '設定',
      link: '/settings',
    },
    {
      icon: 'info',
      label: 'このアプリについて',
      link: '/about',
    },
  ];

  constructor() {
    this.appSignOut = new EventEmitter<never>();
  }

  ngOnInit(): void {}

  onSignOut(): void {
    this.appSignOut.emit();
  }
}
