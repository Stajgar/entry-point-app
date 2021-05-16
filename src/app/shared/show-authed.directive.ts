import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;
  verifyUserLogIn() {
    return window.sessionStorage.getItem('userId');
  }
  ngOnInit() {
    if (
      (this.condition && this.verifyUserLogIn()) ||
      (!this.verifyUserLogIn() && !this.condition)
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
