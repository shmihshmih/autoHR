import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-interview-popup',
  templateUrl: './interview-popup.component.html',
  styleUrls: ['./interview-popup.component.css']
})
export class InterviewPopupComponent implements OnInit {

  difficultiesControl = new FormControl();
  competencesControl = new FormControl();
  popularityControl = new FormControl();

  tasksCount = 0;
  typeModel = 0;

  config: {
    count?: number;
    type?: number;
    difficulty?: string[],
    competence?: string[],
    popularity?: string[]
  } = {};

  constructor(
    public dialogRef: MatDialogRef<InterviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(isStart: boolean): void {
    this.config = {
      count: this.tasksCount,
      type: this.typeModel,
      difficulty: this.difficultiesControl.value,
      competence: this.competencesControl.value,
      popularity: this.popularityControl.value
    }
    if (isStart) {
      this.dialogRef.close(this.config);
    } else {
      this.dialogRef.close();
    }
  }
}
