import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { FormulaEditorComponent } from './formula-editor/formula-editor.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { AdDirective } from './ad.directive';
import { AdbannerComponent } from './adbanner/adbanner.component';
import { AdserviceService } from './adservice.service';
import { FieldsDirective } from './fields.directive';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ExerciseComponent,
    FormulaEditorComponent,
    ButtonsComponent,
    AdDirective,
    AdbannerComponent,
    FieldsDirective,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AdserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
