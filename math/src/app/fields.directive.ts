import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFields]'
})
export class FieldsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
