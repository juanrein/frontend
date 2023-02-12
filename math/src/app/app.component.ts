import { Component } from '@angular/core';
import { SYMBOLS } from './symbols';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'math';

  symbols = SYMBOLS;

  ex = "1 b"
  points = 1

  description = "Ratkaise yhtälö 3x^2 - 2x + 2 = 2(x^2+1)"
  
}
