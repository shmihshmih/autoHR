import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "./core/api.service";
import {MatDialog} from "@angular/material/dialog";
import {InterviewPopupComponent} from "./interview-popup/interview-popup.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ITask} from "./intefaces/question.model";
import {ISobesConfigModel} from "./intefaces/sobesConfig.model";
import {TaskAnswerPopupComponent} from "./task-answer-popup/task-answer-popup.component";
import {FormControl} from "@angular/forms";
import {ModTaskPopupComponent} from "./mod-task-popup/mod-task-popup.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  // просто список тасков. Мы его не меняем, работаем и обрабатываем.
  tasks: ITask[] = [];
  dataSource = new MatTableDataSource<ITask>();
  columnsToDisplay = ['id', 'question', 'type', 'difficulty', 'popularity'];
  expandedElement: ITask | null = null;
  step: 'start' | 'interview' | 'catalog' = 'start';

  difficultiesList: string[] = [];
  competencesList: string[] = [];
  popularityList: string[] = [];

  difficultiesControl = new FormControl();
  competencesControl = new FormControl();
  popularityControl = new FormControl();

  tasksCount = 0;
  typeModel = 0;

  config: ISobesConfigModel;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) {
    this.api.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      let tableDataSrc = this.setTableIndex(0, this.tasks);
      this.dataSource = new MatTableDataSource(tableDataSrc);
    });
  }

  ngOnInit(): void {
    // получаем справочники
    this.api.getDifficulties().subscribe((difficulties) => {
      this.difficultiesList = difficulties;
    });
    this.api.getCompetences().subscribe((competences) => {
      this.competencesList = competences;
    });
    this.api.getPopularity().subscribe((popularity) => {
      this.popularityList = popularity;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // попап, где проставляем конфиги
  openInterviewPopup(): void {
    const dialogRef = this.dialog.open(InterviewPopupComponent, {
      data: {
        difficultiesList: this.difficultiesList,
        competencesList: this.competencesList,
        popularityList: this.popularityList
      }
    });

    dialogRef.afterClosed().subscribe(config => {
      if (config && config.count) {
        this.step = 'interview';
        this.tasksCount = config.count;
        this.typeModel = config.type;
        this.difficultiesControl.patchValue(config.difficulty);
        this.competencesControl.patchValue(config.competence);
        this.popularityControl.patchValue(config.popularity);
        this.config = config;
        this.setTableData(config);
      }
    });
  }

  // попап с ответом
  openTaskAnswerPopup(task: ITask): void {
    const dialogRef = this.dialog.open(TaskAnswerPopupComponent, {
      data: {task}
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('data: ', data);
    });
  }

  // попап редактирования таска
  openModTaskPopup(task: ITask): void {
    console.log('task: ', task);
    const dialogRef = this.dialog.open(ModTaskPopupComponent, {
      data: {task}
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('data: ', data);
    });
  }

  // обновляем данные в таблице в соответсвии с новым конфигом
  refreshTable(): void {
    this.config = {
      count: this.tasksCount,
      type: this.typeModel,
      difficulty: this.difficultiesControl.value,
      competence: this.competencesControl.value,
      popularity: this.popularityControl.value
    };
    this.setTableData(this.config);
  }

  // фильтруем таски как надо и выставляем в таблицу
  setTableData(config: ISobesConfigModel): void {
    let newDataSource: ITask[] = [];

    let matchedQuestions: ITask[] = [];
    let matchedExercises: ITask[] = [];
    let unmatchedQuestions: ITask[] = [];
    let unmatchedExercises: ITask[] = [];

    let questionNumber = Math.round(config.count * config.type / 100);
    let exerciseNumber = config.count - questionNumber;

    this.tasks.forEach((task: ITask) => {
      let taskChecker = (task: ITask, config: ISobesConfigModel) => {
        return task.competence.every(v => config.competence.includes(v));
      };
      if (config.difficulty.includes(task.difficulty) && config.popularity.includes(task.popularity) && taskChecker(task, config)) {
        if (task.type === 'question') {
          matchedQuestions.push(task)
        }
        if (task.type === 'exercise') {
          matchedExercises.push(task)
        }
      } else {
        if (task.type === 'question') {
          unmatchedQuestions.push(task)
        } else if (task.type === 'exercise') {
          unmatchedExercises.push(task)
        } else {
          unmatchedQuestions.push(task);
        }
      }
    });

    let matchedQuestionsRandom = [];
    for (let i = 0; i < matchedQuestions.length; i++) {
      let it = this.randomizer(matchedQuestions);
      matchedQuestionsRandom.push(it);
    }

    let matchedExercisesRandom = [];
    for (let i = 0; i < matchedExercises.length; i++) {
      let it = this.randomizer(matchedExercises);
      matchedExercisesRandom.push(it);
    }

    let unmatchedQuestionsRandom = [];
    for (let i = 0; i < unmatchedQuestions.length; i++) {
      let it = this.randomizer(unmatchedQuestions);
      unmatchedQuestionsRandom.push(it);
    }

    let unmatchedExercisesRandom = [];
    for (let i = 0; i < unmatchedExercises.length; i++) {
      let it = this.randomizer(unmatchedExercises);
      unmatchedExercisesRandom.push(it);
    }

    let questions: ITask[] = matchedQuestionsRandom.concat(unmatchedQuestionsRandom);
    let exercises: ITask[] = matchedExercisesRandom.concat(unmatchedExercisesRandom);

    newDataSource.push(...questions.slice(0, questionNumber));
    newDataSource.push(...exercises.slice(0, exerciseNumber));

    if (questionNumber > questions.length) {
      newDataSource.push(...exercises.slice(exerciseNumber, exerciseNumber + questionNumber - questions.length));
    }

    if (exerciseNumber > exercises.length) {
      newDataSource.push(...questions.slice(questionNumber, questionNumber + exerciseNumber - exercises.length));
    }
    newDataSource = this.setTableIndex(0, newDataSource);
    this.dataSource = new MatTableDataSource(newDataSource);
  }

  // перемешиваем все элементы в предложенном массиве
  randomizer(arr: ITask[]): any {
    const itemNum = Math.floor(Math.random() * arr.length);
    return arr.splice(itemNum, 1)[0];
  }

  /**
   * Сбрасываем все конфиги и идем на первую
   * @param type: 'reset-filters' | 'close-block'
   */
  goToStart(type: 'reset-filters' | 'close-block'): void {
    this.config = {
      count: 0,
      type: 0,
      difficulty: [],
      competence: [],
      popularity: []
    };

    this.dataSource = new MatTableDataSource(this.setTableIndex(0, this.tasks));

    this.difficultiesControl.reset()
    this.competencesControl.reset()
    this.popularityControl.reset()
    this.tasksCount = 0;
    this.typeModel = 0;

    if (type === 'close-block') {
      this.step = 'start';
    }
  }

  // удаление таска
  removeTask(task: ITask): void {
    const isRemove = confirm('Удалить вопрос из таблицы (из системы не удалится)?');
    if (!isRemove) return;
    let newDataSource = this.dataSource.filteredData.filter((item: ITask) => {
      return item.id !== task.id;
    });
    this.dataSource = new MatTableDataSource(newDataSource);
  }

  // связываем вручную пагинатор и таблицу и данные
  pagination(paginator: any) {
    let paginatedTasks: any[] = this.tasks.slice(paginator._pageIndex * paginator._pageSize, paginator._pageIndex * paginator._pageSize + paginator._pageSize);
    paginatedTasks = this.setTableIndex(paginator._pageIndex * paginator._pageSize, paginatedTasks)
    this.dataSource = new MatTableDataSource(paginatedTasks);
  }

  // проставляем индексы для таблицы
  setTableIndex(start: number, data: any[]): any[] {
    let indexedData = [];
    for (let i = start, j = 0; j < data.length; i++, j++) { indexedData.push({...data[j], tableIndex: i + 1}) }
    return indexedData;
  }
}

