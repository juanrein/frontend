import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
  <div>
    <div class="button-container">
        <button 
            class="latex-button"
            *ngFor="let kv of symbols" 
            type="button" 
            title="{{kv[1]['text']}}" 
            (mousedown)="handleSymbol(kv[0])">
            {{kv[0]}}
        </button>
    </div>

</div>
`,
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input() symbols!: any[];

  @Output() buttonPressedEvent = new EventEmitter<string>();
  @Output() formulaClickEvent = new EventEmitter<void>();

  handleSymbol(symbol: string) {
    this.buttonPressedEvent.emit(symbol);
  }

}
