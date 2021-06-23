import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ApiService} from "./core/api.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {InterviewPopupComponent} from './interview-popup/interview-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TaskAnswerPopupComponent} from './task-answer-popup/task-answer-popup.component';
import {MatChipsModule} from '@angular/material/chips';
import {ModTaskPopupComponent} from './mod-task-popup/mod-task-popup.component';
import {MatSortModule} from "@angular/material/sort";
import {AppRoutingModule} from "./app-routing.module";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    InterviewPopupComponent,
    TaskAnswerPopupComponent,
    ModTaskPopupComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatIconModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
