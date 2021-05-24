import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
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

  getDifficulties(): Observable<any[]> {
    const difficulties = [
      'beginner', 'junior', 'middle', 'senior'
    ];
    return of(difficulties);
  }

  getCompetences(): Observable<any[]> {
    const competences = [
      'common questions', 'javascript', 'typescript', 'angular', 'react', 'nodejs', 'html', 'css', 'frontend', 'backend'
    ]
    return of(competences);
  }

  getPopularity(): Observable<any[]> {
    const popularity = [
      '1', '2', '3', '4', '5'
    ]
    return of(popularity);
  }
}
