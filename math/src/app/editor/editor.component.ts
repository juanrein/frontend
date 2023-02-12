import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SymbolMapping } from 'src/symbolMapping';
// import * as MathQuill from "mathquill-0.10.1"


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() symbols: SymbolMapping = {};

  output = new FormControl("");

  mathField: any;

  @ViewChild("mqfield") mqinput!: ElementRef<HTMLElement>;

  MQ: any;

  editHandler(field: any) {
    console.log(field)
    let latex = field.latex();
    this.output.setValue(latex);
  }

  enterHandler(field: any) {
    console.log("enter")
  }

  ngAfterViewInit() {
    let elem = this.mqinput.nativeElement;
    let config = {
      spaceBehavesLikeTab: true,
      handlers: {
        edit: (field:any) => this.editHandler(field),
        enter: (field: any) => this.enterHandler(field)
      }
    };
    this.MQ = MathQuill.getInterface(2);
    let field = this.MQ.MathField(elem, config)
    this.mathField = field;
  }

  getSymbols() {
    return Object.entries(this.symbols);
  }

  /**
   * https://stackoverflow.com/questions/9335325/blur-event-stops-click-event-from-working
   */
  handleSymbol(name: string) {
    let { latex } = this.symbols[name];
    this.mathField.write(latex);
    // console.log(this.mathField);
    // console.log(this.mathField.el());
    // this.mathField.focus();
    
  }

  ngOnInit() {
    this.output.disable()
  }
}
