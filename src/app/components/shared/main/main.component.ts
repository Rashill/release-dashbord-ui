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
      routerUrl: '/main/dashboard',
      iconClass: 'material-icons',
      iconCode: 'dashboard'
    },
    {
      title: 'Basics',
      iconClass: 'material-icons',
      iconCode: 'format_color_text',
      children: [
        {
          title: 'Typography',
          routerUrl: '/main/typography'
        },
        {
          title: 'Icons',
          routerUrl: '/main/icons'
        }
      ]
    },
    {
      title: 'Layout',
      iconClass: 'material-icons',
      iconCode: 'view_list',
      children: [
        {
          title: 'Cards',
          routerUrl: '/main/cards'
        },
        {
          title: 'Lists',
          routerUrl: '/main/lists'
        },
        {
          title: 'Tabs',
          routerUrl: '/main/tabs'
        },
        {
          title: 'Accordion',
          routerUrl: '/main/accordion'
        },
        {
          title: 'Grid',
          routerUrl: '/main/grid'
        }
      ]
    },
    {
      title: 'Components',
      iconClass: 'material-icons',
      iconCode: 'view_module',
      children: [
        {
          title: 'Tooltip',
          routerUrl: '/main/tooltip'
        },
        {
          title: 'Dropdown',
          routerUrl: '/main/dropdown'
        },
        {
          title: 'Table',
          routerUrl: '/main/table'
        },
        {
          title: 'Datepicker',
          routerUrl: '/main/datepicker'
        },
        {
          title: 'Timepicker',
          routerUrl: '/main/timepicker'
        },
        {
          title: 'Rating',
          routerUrl: '/main/rating'
        },
        {
          title: 'Pagination',
          routerUrl: '/main/pagination'
        },
        {
          title: 'Modal',
          routerUrl: '/main/modal'
        },
        {
          title: 'Popover',
          routerUrl: '/main/popover'
        },
        {
          title: 'Progress bar',
          routerUrl: '/main/progressbar'
        },
        {
          title: 'Badge',
          routerUrl: '/main/badge'
        },
        {
          title: 'Other',
          routerUrl: '/main/other'
        }
      ]
    },
    {
      title: 'Forms',
      iconClass: 'material-icons',
      iconCode: 'subject',
      children: [
        {
          title: 'Buttons',
          routerUrl: '/main/buttons'
        },
        {
          title: 'Inputs',
          routerUrl: '/main/form-elements'
        }
      ]
    },
    {
      title: 'User pages',
      iconClass: 'material-icons',
      iconCode: 'person',
      children: [
        {
          title: 'Login',
          routerUrl: '/login'
        },
        {
          title: 'Sing up',
          routerUrl: '/register'
        },
        {
          title: 'Profile',
          routerUrl: '/main/profile'
        },
        {
          title: 'Coming soon',
          routerUrl: '/coming-soon'
        },
        {
          title: 'Maintenance',
          routerUrl: '/maintenance'
        },
        {
          title: 'Not found',
          routerUrl: '/404'
        }
      ]
    },
    {
      title: 'E-commerce',
      iconClass: 'material-icons',
      iconCode: 'shopping_cart',
      children: [
        {
          title: 'Products',
          routerUrl: '/main/products'
        },
        {
          title: 'Product page',
          routerUrl: '/main/product-details'
        },
        {
          title: 'Cart',
          routerUrl: '/main/cart'
        },
        {
          title: 'Pricing Tables',
          routerUrl: '/main/pricing-tables'
        },
        {
          title: 'Contacts',
          routerUrl: '/main/contact'
        }
      ]
    },
    {
      title: 'Extra',
      iconClass: 'material-icons',
      iconCode: 'work',
      children: [
        {
          title: 'Grid table',
          routerUrl: '/main/component-table'
        },
        {
          title: 'Slider',
          routerUrl: '/main/slider'
        },
        {
          title: 'Tree',
          routerUrl: '/main/tree'
        },
        {
          title: 'Gallery',
          routerUrl: '/main/gallery'
        },
        {
          title: 'Editor',
          routerUrl: '/main/editor'
        },
        {
          title: 'Drag & Drop',
          routerUrl: '/main/drag'
        },
        {
          title: 'Multi language',
          routerUrl: '/main/translate'
        },
        {
          title: 'Scroll',
          routerUrl: '/main/scroll'
        }
      ]
    },
    {
      title: 'Charts',
      iconClass: 'material-icons',
      iconCode: 'assessment',
      children: [
        {
          title: 'Line charts',
          routerUrl: '/main/linechart'
        },
        {
          title: 'Bar charts',
          routerUrl: '/main/barchart'
        },
        {
          title: 'Pie charts',
          routerUrl: '/main/piechart'
        },
        {
          title: 'Bubble charts',
          routerUrl: '/main/bubblechart'
        },
        {
          title: 'Heatmap',
          routerUrl: '/main/heatmap'
        },
        {
          title: 'Radar',
          routerUrl: '/main/radar'
        }
      ]
    },
    {
      title: 'Maps',
      iconClass: 'material-icons',
      iconCode: 'place',
      children: [
        {
          title: 'Google Maps',
          routerUrl: '/main/google-map'
        },
        {
          title: 'Data Maps',
          routerUrl: '/main/data-maps'
        }
      ]
    },
    {
      title: 'Label',
      count: 10,
      iconClass: 'material-icons',
      iconCode: 'label',
      routerUrl: '',
      children: []
    },
    {
      title: 'Multilevel',
      iconClass: 'material-icons',
      iconCode: 'clear_all',
      children: [
        {
          title: 'Level 1',
          children: [
            {
              title: 'Level 2'
            },
            {
              title: 'Level 2'
            },
            {
              title: 'Level 2'
            }
          ]
        },
        {
          title: 'Level 1'
        },
        {
          title: 'Level 1'
        }
      ]
    },
    {
      title: 'Buy Sofu',
      iconClass: 'material-icons',
      iconCode: 'star',
      externalUrl:
        'https://themeforest.net/item/sofu-angular-5-bootstrap-4-admin-template/21363343',
      children: []
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
