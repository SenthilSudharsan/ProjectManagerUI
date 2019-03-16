import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './Project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private ProjectsUrl = 'http://localhost/ProjectManagerAPI/api/Project';
  private ProjectByProjectidUrl = 'http://localhost/ProjectManagerAPI/api/Project/';
  private CreateProjectUrl = 'http://localhost/ProjectManagerAPI/api/Project';
  private DeleteProjectUrl = 'http://localhost/ProjectManagerAPI/api/Project/';
  private UpdateProjectUrl = 'http://localhost/ProjectManagerAPI/api/Project/';


  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getProjects(): Observable<Project[]> {
    console.log('calling getProjects...');
    return this.http.get<Project[]>(this.ProjectsUrl).pipe(
      catchError(this.handleError('getProjects', []))
    );
  }

  addProject(project: Project): Observable<any> {
    console.log('calling addProject...');
    return this.http.post<boolean>(this.CreateProjectUrl, project).pipe(
      catchError(this.handleError('addProject', []))
    );
  }

  updateProject(project: Project, project_id: number): Observable<any> {
    console.log('calling updateProject...');
    return this.http.put<boolean>(this.UpdateProjectUrl + project_id, project).pipe(
      catchError(this.handleError('updateProject', []))
    );
  }

}
