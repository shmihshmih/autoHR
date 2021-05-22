import {Component, OnInit} from '@angular/core';
import {ApiService} from "./core/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.api.getAllTasks().subscribe(tasks => {
      console.log('tasks: ', tasks);
    });
  }
}
