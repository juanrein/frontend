import { Component, Input } from '@angular/core';
import { SymbolMapping } from 'src/symbolMapping';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input() symbols: SymbolMapping = {};
  @Input() description: string = "";
  @Input() ex: string = "";
  @Input() points: number = 0;
} 
