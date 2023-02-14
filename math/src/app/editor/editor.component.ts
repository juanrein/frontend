import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SymbolMapping } from 'src/symbolMapping';
// import * as MathQuill from "mathquill-0.10.1"

enum ActiveEditorType {
  Visual = "visual",
  Latex = "latex"
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() symbols: SymbolMapping = {};

  outputControl = new FormControl("");
  @ViewChild("output") output!: ElementRef<HTMLTextAreaElement>;
  mathField: any;

  @ViewChild("mqfield") mqinput!: ElementRef<HTMLElement>;
  MQ: any;

  activeEditor: ActiveEditorType = ActiveEditorType.Visual;

  editHandler(field: any) {
    if (this.activeEditor === ActiveEditorType.Visual) {
      let latex = field.latex();
      this.outputControl.setValue(latex);
    }
  }

  enterHandler(field: any) {
    console.log("enter")
  }

  ngAfterViewInit() {
    let elem = this.mqinput.nativeElement;
    elem.addEventListener("click", (e: MouseEvent) => {
      this.activeEditor = ActiveEditorType.Visual;
    })
    let config = {
      spaceBehavesLikeTab: true,
      handlers: {
        edit: (field: any) => this.editHandler(field),
        enter: (field: any) => this.enterHandler(field)
      }
    };
    this.MQ = MathQuill.getInterface(2);
    let field = this.MQ.MathField(elem, config);
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
    if (this.activeEditor === ActiveEditorType.Visual) {
      this.mathField.write(latex);
    }
    else if (this.activeEditor === ActiveEditorType.Latex) {
      //insert at current cursor position in the textarea
      let pos = this.output.nativeElement.selectionStart;
      let oldValue = this.outputControl.value;
      let newValue = oldValue?.slice(0, pos) + latex + oldValue?.slice(pos);
      this.outputControl.setValue(newValue);
    }
    // console.log(this.mathField);
    // console.log(this.mathField.el());
    // this.mathField.focus();

  }

  handleLatexFocus() {
    this.activeEditor = ActiveEditorType.Latex;
  }

  handleLatexInput() {
    this.mathField.latex(this.outputControl.value);
  }

  // ngOnInit() {
  //   //implememts
  //   // this.output.disable()
  // }
}
