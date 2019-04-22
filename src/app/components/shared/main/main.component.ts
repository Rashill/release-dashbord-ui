import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ResizeService } from './../../../services/resize.service';
// import { AuthService } from './../../../services/auth.service';
import { routerTransition } from './../../../../utils/page.animation';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]
})
export class MainComponent implements OnInit {
  userEmail: string;

  // sites: Site[];

  // Model for side menu
  menuModel = [
    {
      title: 'Dashboard',
      routerUrl: '/',
      iconClass: 'material-icons',
      iconCode: 'dashboard'
    },
    {
      title: 'Teams',
      iconClass: 'material-icons',
      iconCode: 'group',
      children: [
        {
          title: 'Create',
          routerUrl: '/teams/typography'
        }
      ]
    },
    {
      title: 'Admin panel',
      iconClass: 'material-icons',
      iconCode: 'build',
      children: [
        {
          title: 'Teams',
          routerUrl: '/team'
        },        {
          title: 'Users',
          routerUrl: '/users'
        },        {
          title: 'Checks',
          routerUrl: '/checklist'
        }
      ]
    },
    {
      title: 'Release Settings',
      iconClass: 'material-icons',
      iconCode: 'settings',
      children: [
        {
          title: 'Checklist',
          routerUrl: '/teams/typography'
        }
      ]
    }
  ];

  isSmallMenuMode = false;
  isMenuCollapsed = false;
  isMenuClosed = this.isSmallWidth();
  isOverlayMenuMode = this.isSmallWidth();
  // Side menu animation value. Is used for delay to render content after side panel changes
  sideNavTransitionDuration = 300;
  // Open/close options window
  isOptionsClosed = true;
  // Box layout option
  isBoxedLayout = false;
  // Fixed header option
  isFixedHeader = true;

  constructor(
    private resizeService: ResizeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.onResize();

    this.userEmail = 'sadasd';

    const vm = this;
  }

  /**
   * Window resize listener
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeService.resizeInformer$.next();
    if (this.isSmallWidth()) {
      this.isOverlayMenuMode = true;
      this.isMenuClosed = true;
      setTimeout(
        () => this.resizeService.resizeInformer$.next(),
        this.sideNavTransitionDuration + 700
      );
    }
  }

  /**
   * Call resize service after side panel mode changes
   */
  onSideNavModeChange() {
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  ngOnInit(): void {}

  /**
   * Call resize service after box mode changes
   */
  toggleBoxed() {
    this.isBoxedLayout = !this.isBoxedLayout;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, 0);
  }

  toggleCompactMenu() {
    this.isSmallMenuMode = !this.isSmallMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  /**
   * Call resize service after side panel mode changes
   */
  toggleOverlayMode() {
    this.isOverlayMenuMode = !this.isOverlayMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  /**
   * Changes header mode
   */
  toggleFixedHeader() {
    this.isFixedHeader = !this.isFixedHeader;
  }

  logout() {
    this.authService.logout();
  }

  /**
   * Return url as state, that will trigger animation when url changes
   * @param outlet
   * @returns {string}
   */
  getState(outlet) {
    return this.router.url;
  }

  private isSmallWidth() {
    return window.innerWidth < 700;
  }
}
