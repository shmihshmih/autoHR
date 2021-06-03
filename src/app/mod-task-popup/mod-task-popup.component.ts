import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.taskFormBuilder();
  }

  taskFormBuilder(): void {
    this.taskForm = this.fb.group({
      question: ['', Validators.required],
      description: ['', Validators.required],
      prevDifficulty: this.fb.array([this.fb.control('')]),
      nextDifficulty: this.fb.array([this.fb.control('')]),
      answer: this.fb.group({
        link: this.fb.array([this.fb.control('')]),
        text: this.fb.array([this.fb.control('')]),
        code: this.fb.array([this.fb.control('')]),
      }),
      type: ['', Validators.required],
      difficulty: ['', Validators.required],
      competence: this.fb.array([this.fb.control('')]),
      popularity: ['', Validators.required]
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

  submit(): void {
    console.log('this.taskForm.value: ', this.taskForm.value);
  }

}
