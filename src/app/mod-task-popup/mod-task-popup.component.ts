import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ITask} from "../intefaces/question.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-mod-task-popup',
  templateUrl: './mod-task-popup.component.html',
  styleUrls: ['./mod-task-popup.component.css']
})
export class ModTaskPopupComponent implements OnInit {
  types = ['question', 'exercise'];
  difficulties = ['beginner', 'junior', 'middle', 'senior'];
  popularities = ['1', '2', '3', '4', '5']
  taskForm: FormGroup = new FormGroup({});

  get prevDifficultyList() {
    return this.taskForm.get('prevDifficulty') as FormArray;
  }

  get nextDifficultyList() {
    return this.taskForm.get('nextDifficulty') as FormArray;
  }

  get linkList() {
    return this.taskForm.controls.answer.get('link') as FormArray;
  }

  get textList() {
    return this.taskForm.controls.answer.get('text') as FormArray;
  }

  get codeList() {
    return this.taskForm.controls.answer.get('code') as FormArray;
  }

  get competenceList() {
    return this.taskForm.get('competence') as FormArray;
  }

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModTaskPopupComponent>,) {
  }

  ngOnInit(): void {
    this.taskFormBuilder();
    if (this.data?.task) {
      this.taskFormPatcher(this.data.task);
    }
  }

  taskFormBuilder(): void {
    this.taskForm = this.fb.group({
      question: ['', Validators.required],
      description: ['', Validators.required],
      prevDifficulty: this.fb.array([this.fb.control('')]),
      nextDifficulty: this.fb.array([this.fb.control('')]),
      answer: this.fb.group({
        link: this.fb.array([this.fb.control('')]),
        text: this.fb.array([this.fb.control('', Validators.required)]),
        code: this.fb.array([this.fb.control('')]),
      }),
      type: ['', Validators.required],
      difficulty: ['', Validators.required],
      competence: this.fb.array([this.fb.control('', Validators.required)]),
      popularity: ['', Validators.required]
    })
  }

  taskFormPatcher(data: ITask): void {
    // патчим форму
    this.taskForm.patchValue({
      question: data.question,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      popularity: data.popularity
    });
    // очищаем все списки
    this.linkList.clear();
    this.textList.clear();
    this.codeList.clear();
    this.prevDifficultyList.clear();
    this.nextDifficultyList.clear();
    this.competenceList.clear();
    // наполняем массивы
    data.answer.link?.forEach(link => {
      this.linkList.push(this.fb.control(link));
    })
    data.answer.text?.forEach(text => {
      this.textList.push(this.fb.control(text));
    })
    data.answer.code?.forEach(code => {
      this.codeList.push(this.fb.control(code));
    })
    data.prevDifficulty?.forEach(pd => {
      this.prevDifficultyList.push(this.fb.control(pd.id));
    })
    data.nextDifficulty?.forEach(nd => {
      this.nextDifficultyList.push(this.fb.control(nd.id));
    })
    data.competence?.forEach(c => {
      this.competenceList.push(this.fb.control(c));
    })
  }

  addControl(controlName: string): void {
    if (controlName === 'prevDifficulty') {
      this.prevDifficultyList.push(this.fb.control(''));
    }
    if (controlName === 'nextDifficulty') {
      this.nextDifficultyList.push(this.fb.control(''));
    }
    if (controlName === 'link') {
      this.linkList.push(this.fb.control(''));
    }
    if (controlName === 'text') {
      this.textList.push(this.fb.control(''));
    }
    if (controlName === 'code') {
      this.codeList.push(this.fb.control(''));
    }
    if (controlName === 'competence') {
      this.competenceList.push(this.fb.control(''));
    }
  }

  removeControl(controlName: string, i: number): void {
    if (controlName === 'prevDifficulty') {
      this.prevDifficultyList.removeAt(i);
    }
    if (controlName === 'nextDifficulty') {
      this.nextDifficultyList.removeAt(i);
    }
    if (controlName === 'link') {
      this.linkList.removeAt(i);
    }
    if (controlName === 'text') {
      this.textList.removeAt(i);
    }
    if (controlName === 'code') {
      this.codeList.removeAt(i);
    }
    if (controlName === 'competence') {
      this.competenceList.removeAt(i);
    }
  }

  submit(): void {
    let submitData = {...this.data.task, ...this.taskForm.value};
    this.dialogRef.close(submitData);
  }

}
