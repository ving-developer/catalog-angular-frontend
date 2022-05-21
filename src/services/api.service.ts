import { Injectable } from '@angular/core';
import { Observable, of, throwError, catchError, tap, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/models/category';
import { User } from 'src/models/user';

const apiUrl = 'https://localhost:7121/api/v2/categories';
const apiLoginUrl = 'https://localhost:7121/api/v2/authentication';
var token = '';
var httpOptions = {headers: new HttpHeaders({"Content-Type":"application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  setupHeaderToken(){
      token = localStorage.getItem('jwt') || 'empty';
      console.log(`jwt header token ${token}`);
      httpOptions = {headers: new HttpHeaders({"Authorization": `Bearer ${token}`, "Content-Type": "application/json"})}
  }

  Login(User : any) : Observable<User> {
    return this.http.post<User>(apiLoginUrl,User).pipe(
      tap((User : User) => console.log(`Login usuário com email: ${User.userName}`)),
      catchError(this.handleError<User>('Login'))
    );
  }

  getCategories(): Observable<Category[]>{
    this.setupHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Category[]>(`${apiUrl}?PageNumber=1&PageSize=50`, httpOptions)
    .pipe(
      tap(_ => console.log('Already read categories')),
      catchError(this.handleError('getCategories',[]))
    );
  }

  getCategory(id: number): Observable<Category>{
    this.setupHeaderToken();
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url,httpOptions).pipe(
      tap(_ => console.log(`Already read category: ${id}`)),
      catchError(this.handleError<Category>(`getCategory id: ${id}`))
    );
  }

  createCategory(Category: any): Observable<Category>{
    this.setupHeaderToken();
    return this.http.post<Category>(apiUrl, Category, httpOptions).pipe(
      tap((Category :Category) => console.log(`Created Category with w/ id: ${Category.categoryId}`)),
      catchError(this.handleError<Category>('createCategory'))
    );
  }

  updateCategory(id: number, Category: any) : Observable<any>{
    const url = `${apiUrl}/${id}`;
    return this.http.put(url,Category,httpOptions).pipe(
      tap(_ => console.log(`Created Category with w/ id: ${id}`)),
      catchError(this.handleError<Category>('updateCategory'))
    );
  }

  deleteCategory(id: number) : Observable<Category>{
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Category>(url,httpOptions).pipe(
      tap(_ => console.log(`Delete Category with w/ id: ${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
