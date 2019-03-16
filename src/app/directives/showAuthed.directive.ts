import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AuthService } from '../services/auth.service';

@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
  isAuthenticated: Boolean;
  condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set showAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(
      'auth',
      (this.isAuthenticated && this.condition) ||
        (!this.isAuthenticated && !this.condition)
    );
    console.log('condition', this.condition);
    if (
      (this.isAuthenticated && this.condition) ||
      (!this.isAuthenticated && !this.condition)
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
