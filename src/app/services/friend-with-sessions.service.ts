import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { catchError, map, tap } from 'rxjs/operators';
 
import { MessageService } from '../shared/services/message.service';
 
//import 'rxjs/add/observable/of';
 
import { Friend } from '../shared/friend';
import { FriendRequestResult } from '../shared/FriendRequestResult';
 
import { Observable } from 'rxjs';
 
@Injectable()
export class FriendWithSessionsService {
  private server: string = 'http://localhost:8080';
  private serverApp = '/api-friends';
  private servicesPath = '/servlet';
  private serviceName = '';
  private body: any;
  private wsUrl: string;
 
  private username: string = "";
 
  constructor(private http: HttpClient, private messageService: MessageService ) {
    //this.wsUrl = 'http://localhost:8080/api-friends/services/friend-service';
    this.wsUrl = this.server + this.serverApp + this.servicesPath;
  }
 
   // URL http://localhost:8080/api-friends/servlet/friend?action=list_all
  getAllFriends(): Observable<any> {
    const url = `${this.wsUrl}/friend?action=list_all`;
    return this.http.get<FriendRequestResult>(url, {withCredentials: true})
    .pipe(catchError(this.handleError<any>('getAllFriends', [])));
  }
 
 
   getFriend(phone: string): Observable<FriendRequestResult> {
 
     const url = `${this.wsUrl}/friend?action=search_by_phone&phone=${phone}`;
 
     return this.http.get<FriendRequestResult>(url, {withCredentials: true})
     .pipe(catchError(this.handleError<any>('getFriend', [])));
 
   }
 
   insert(friend: Friend): Observable<Friend> {
     const url = `${this.wsUrl}/friend?action=add`;
     // set query parameters from form data
 
     let httpParams = new HttpParams()
       .append('phone', friend.phone)
       .append('name', friend.name)
       .append('age', friend.age.toString());
 
 
     // configure headers for form data.
     let httpHeaders : HttpHeaders = new HttpHeaders();
 
     httpHeaders.set('Content-Type',
     "application/x-www-form-urlencoded;charset=UTF-8");
 
 
     // send request
     return this.http
       .post<Friend>(url, httpParams, {headers: httpHeaders, withCredentials: true})
       .pipe(catchError(this.handleError<any>('insert', [])));
   }
 
   update(oldPhone: string, friend: Friend): Observable<FriendRequestResult> {
     const url = `${this.wsUrl}/friend?action=modify`;
     // set query parameters from form data
     let httpParams = new HttpParams()
       .append('phone', friend.phone)
       .append('name', friend.name)
       .append('age', friend.age.toString())
       .append('oldphone', oldPhone);
 
     // configure headers for form data.
     let httpHeaders : HttpHeaders = new HttpHeaders();
 
     httpHeaders.set('Content-Type',
     "application/x-www-form-urlencoded;charset=UTF-8");
 
     // send request
     return this.http
       .post<Friend>(url, httpParams, {headers: httpHeaders, withCredentials: true})
       .pipe(catchError(this.handleError<any>('update', [])));
   }
 
 
   delete(friend: Friend): Observable<any> {
    const url = `${this.wsUrl}/friend?action=remove`;
 
    let httpParams = new HttpParams()
    .append('phone', friend.phone)
 
    // send request
    return this.http.post(url, httpParams, {withCredentials: true})
    .pipe(catchError(this.handleError<any>('delete', [])));;
  }
 
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<Friend> (operation = 'operation', result?: any) {
  return (error: any): Observable<Friend> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // lsog to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return result;
  };
}
 
/** Log a FriendService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
 
 getUsername(): string{
   return this.username;
 }
}