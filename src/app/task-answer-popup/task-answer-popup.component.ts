import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ITask} from "../intefaces/question.model";

@Component({
  selector: 'app-task-answer-popup',
  templateUrl: './task-answer-popup.component.html',
  styleUrls: ['./task-answer-popup.component.css']
})
export class TaskAnswerPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskAnswerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    console.log('data: ', this.data);
  }

  onNoClick(isStart: boolean): void {
    if (isStart) {
      this.dialogRef.close('this.config');
    } else {
      this.dialogRef.close();
    }
  }

}
