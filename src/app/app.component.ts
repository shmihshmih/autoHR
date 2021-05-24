import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "./core/api.service";
import {MatDialog} from "@angular/material/dialog";
import {InterviewPopupComponent} from "./interview-popup/interview-popup.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ITask} from "./intefaces/question.model";

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

  dataSource: ITask[] = [];
  columnsToDisplay = ['id', 'question', 'type', 'difficulty', 'popularity'];
  expandedElement: ITask | null = null;
  step: 'start' | 'interview' | 'catalog' = 'start';

  difficultiesList: string[] = [];
  competencesList: string[] = [];
  popularityList: string[] = [];

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.api.getAllTasks().subscribe((tasks) => {
      this.dataSource = tasks;
    });
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
        this.setTableData(config);
      }
    });
  }

  setTableData(config: any): void {
    const newDataSource: ITask[] = [];
    this.dataSource.forEach(task => {
      if (config.difficulty.include(task.difficulty) | config.competence.include(...task.competence) | config.popularity.include(task.popularity)) {
        newDataSource.push(task);
      }
    });
    this.dataSource = newDataSource;
  }
}

