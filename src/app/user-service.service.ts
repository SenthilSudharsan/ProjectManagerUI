import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './User';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private UsersUrl = 'http://localhost/ProjectManagerAPI/api/User';
  private UserByUseridUrl = 'http://localhost/ProjectManagerAPI/api/User/';
  private CreateUserUrl = 'http://localhost/ProjectManagerAPI/api/User';
  private DeleteUserUrl = 'http://localhost/ProjectManagerAPI/api/User/';
  private UpdateUserUrl = 'http://localhost/ProjectManagerAPI/api/User/';


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    console.log('calling getUsers...');
    return this.http.get<User[]>(this.UsersUrl).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  addUser(user: User): Observable<any> {
    console.log('calling addUser...');
    return this.http.post<boolean>(this.CreateUserUrl, user).pipe(
      catchError(this.handleError('addUser', []))
    );
  }

  updateUser(user: User, user_id: number): Observable<any> {
    console.log('calling updateUser...');
    return this.http.put<boolean>(this.UpdateUserUrl + user_id, user).pipe(
      catchError(this.handleError('updateUser', []))
    );
  }

  deleteUser(user_id: number): Observable<any> {
    console.log('calling deleteUser...');
    return this.http.delete<boolean>(this.DeleteUserUrl + user_id).pipe(
      catchError(this.handleError('deleteUser', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
