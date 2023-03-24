import { Component, EventEmitter, Input, Output, QueryList, Type, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Edit, FieldComponent } from '../field/field.component';

export class FieldItem {
    constructor(public component: Type<any>, public latex: string, public active: boolean) { }
}

export type FieldType = {
    latex: string
}

@Component({
    selector: 'app-formula-editor',
    templateUrl: './formula-editor.component.html',
    styleUrls: ['./formula-editor.component.css']
})
export class FormulaEditorComponent {
    @Input() aceControl!: FormControl;

    @Output() closeEvent = new EventEmitter<void>;

    fields: FieldType[] = [
        {
            latex: ""
        }
    ];
    active: number = 0;

    @ViewChildren(FieldComponent) fieldComponents!: QueryList<FieldComponent>;

    addField() {
        this.fields.push({
            latex: ""
        })
        this.active = this.fields.length-1;
    }

    removeField() {
        if (this.fields.length <= 1) {
            return;
        }
        this.fields.splice(this.active, 1);
        this.active = this.fields.length-1;
    }

    handleOk() {
        const text = "$$\n" + this.fields.map(field => field.latex).join("\\\\\n") + "\n$$";
        console.log(text);
        this.aceControl.setValue(text);        
    }

    /**
     * https://stackoverflow.com/questions/9335325/blur-event-stops-click-event-from-working
     */
    handleSymbol = (latexSymbol: string) => {


    }

    handleEdited(res: Edit) {
        this.fields[res.id].latex = res.latex;
        this.active = res.id;
    }

    handleFocus(res: Edit) {
        this.fields[res.id].latex = res.latex;
        this.active = res.id;
    }

}
