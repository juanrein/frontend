import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SymbolMapping } from 'src/symbolMapping';
import { AdItem } from '../adbanner/adbanner.component';
import { AdserviceService } from '../adservice.service';
import { FormulaEditorComponent } from '../formula-editor/formula-editor.component';


@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    @Input() symbols!: SymbolMapping;

    aceControl = new FormControl("");

    @ViewChild("formulaEditor") formulaEditor!: FormulaEditorComponent;

    @ViewChild("textareaElement") textareaElement!: ElementRef<HTMLTextAreaElement>;

    @ViewChild("image") imageElem!: ElementRef<HTMLImageElement>;

    textareaHasFocus: boolean = true;

    uploaded = false;
    currentRotation = 0;

    setFocus(value: boolean) {
        this.textareaHasFocus = value;
    }

    formulaViewVisible: boolean = true;

    getSymbols = () => {
        return Object.entries(this.symbols);
    }

    ads: AdItem[] = [];
    constructor(private adService: AdserviceService) { }
    ngOnInit(): void {
        this.aceControl.setValue("#kissa\n\n$$\n\\frac{1}{2}\\\\\n1+1=2\n$$\n\nMuuta");
        this.ads = this.adService.getAds();
    }

    /**
    * https://stackoverflow.com/questions/9335325/blur-event-stops-click-event-from-working
    */
    handleSymbol(name: string) {
        let { latex } = this.symbols[name];
        if (this.textareaHasFocus) {
            this.aceControl.setValue(this.aceControl.value + latex);
        }
        else {
            this.formulaEditor.handleSymbol(latex);
        }
        // console.log(this.mathField);
        // console.log(this.mathField.el());
        // this.mathField.focus();
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement | null;
        if (!target || !target.files) {
            return;
        }
        const file: File = target.files[0];
        this.imageElem.nativeElement.src = URL.createObjectURL(file);
        this.imageElem.nativeElement.style.transform = `rotate(${this.currentRotation}deg)`;

        this.uploaded = true;
    }

    doRotate() {
        this.currentRotation = (this.currentRotation + 90) % 360;
        this.imageElem.nativeElement.style.transform = `rotate(${this.currentRotation}deg)`;
    }

    modify() {
        const cursorI = this.textareaElement.nativeElement.selectionStart;
        const text = this.aceControl.value;
        if (text === null) {
            return;
        }
        let startI = -1;
        let startSymbol = undefined;
        let i = 0;
        while (i < text.length) {
            if (text.startsWith("$$", i)) {
                // block end
                if (startI !== -1 && startSymbol === "$$") {
                    //between cursor
                    if (startI <= cursorI && cursorI <= i) {
                        console.log(startI,i, text.slice(startI+2, i));
                        return;
                    }
                    startI = -1;
                    startSymbol = undefined;
                    i += 2;
                }
                else { //block start
                    startI = i;
                    startSymbol = "$$"
                    i += 2;
                }
            }
            else if (text.startsWith("$", i)) {
                // inline end
                if (startI !== -1 && startSymbol === "$") {
                    // between cursor
                    if (startI <= cursorI && cursorI <= i) {
                        console.log(startI,i, text.slice(startI+1, i));
                        return;
                    }
                    startI = -1;
                    startSymbol = undefined;
                    i += 1;
                }
                // inline start
                else {
                    startI = i;
                    startSymbol = "$"
                    i++;
                }

            }
            else {
                i++;
            }
        }
        console.log("not inside formula")
    }
}
