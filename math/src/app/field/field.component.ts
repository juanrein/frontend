import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


export enum ActiveEditorType {
  Visual = "visual",
  Latex = "latex"
}


export type Edit = {
  id: number,
  latex: string
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements AfterViewInit {

  @ViewChild("latexTextArea") textareaElement?: ElementRef<HTMLTextAreaElement>;

  currentLatex: string = "";
  activeEditor: ActiveEditorType = ActiveEditorType.Visual;
  mathField: any;

  @ViewChild("mqfield") mqinput!: ElementRef<HTMLElement>;

  @Input() id!: number;

  @Input() initialValue!: string
  @Input() 
  get isActive(): boolean {
    return this._isActive;
  };
  set isActive(value: boolean) {
    if (value) {
      setTimeout(() => {
        this.mathField.focus();
      }, 0);
    }
    this._isActive = value;
  }
  private _isActive = false;

  rows: number = 1;
  setRows(value: number) {
    this.rows = value;
  }

  @Output() edited = new EventEmitter<Edit>();
  @Output() enter = new EventEmitter<void>();
  @Output() backspace = new EventEmitter<void>();
  @Output() focus = new EventEmitter<Edit>();

  ngAfterViewInit(): void {
    this.initializeField();
  }

  initializeField() {
    const config = {
      spaceBehavesLikeTab: true,
      handlers: {
        edit: (field: any) => this.editHandler(field),
        enter: (field: any) => this.enterHandler(field)
      }
    };

    let elem = this.mqinput.nativeElement;
    elem.addEventListener("click", e => {
      this.activeEditor = ActiveEditorType.Visual;
    })
    const MQ = MathQuill.getInterface(2);
    let field = MQ.MathField(elem, config);
    this.mathField = field;
    this.mathField.latex(this.initialValue);
  }

  updateRows() {
    const nrows = this.currentLatex.split("\n").length
    this.setRows(nrows);
  }

  editHandler(field: any) {
    if (this.activeEditor === ActiveEditorType.Visual) {
      this.currentLatex = field.latex();
      this.edited.emit({ latex: this.currentLatex, id: this.id });
      this.updateRows();
    }
  }
  enterHandler(field: any) {
  }


  handleLatexFocus() {
    this.activeEditor = ActiveEditorType.Latex;
  }

  handleLatexInput(event: KeyboardEvent) {
    if (this.activeEditor === ActiveEditorType.Latex) {
      this.mathField.latex(this.currentLatex);
      this.edited.emit({ latex: this.currentLatex, id: this.id });
      this.updateRows();
    }
  }

  enterPressed() {
    this.enter.emit();
  }

  backspacePressed() {
    if (this.currentLatex.length === 0) {
      this.backspace.emit();
    }
  }

  handleFocus() {
    this.mqinput.nativeElement.focus();
    this.focus.emit({
      latex: this.currentLatex,
      id: this.id
    });
  }

}
