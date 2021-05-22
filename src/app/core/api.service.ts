import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ITask} from "../intefaces/question.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`./assets/_tasks.json`);
  }
}
