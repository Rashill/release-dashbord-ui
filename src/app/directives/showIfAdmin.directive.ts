import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AuthService } from '../services/auth.service';

@Directive({ selector: '[showIfAdmin]' })
export class ShowIfAdminDirective implements OnInit {
  isAuthenticated: Boolean;
  isAdmin: Boolean;
  condition: Boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {
    this.isAdmin = authService.getUser().role === 'SuperAdmin';
  }

  @Input()
  set showIfAdmin(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    // this.isAuthenticated = this.authService.isAuthenticated();
    // this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
