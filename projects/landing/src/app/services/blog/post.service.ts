import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = environment.apiURL+"/prf/posts/";

  constructor(private http:HttpClient) { }

  findAll(): Observable<Post[]>{
    let params = new HttpParams().set("recents", "no");
    return this.http.get<Post[]>(this.apiUrl+"find-all-published/",{params})
  }

  getRecentsPosts(): Observable<Post[]>{
    let params = new HttpParams().set("recents", "yes");
    return this.http.get<Post[]>(this.apiUrl+"find-all-published",{params})
  }
  
  viewPost(slug:any): Observable<any>{
    let params = new HttpParams().set("slug", slug);
    return this.http.get<Post>(this.apiUrl+"views",{params})
  }

  getPostsByCategory(id:any):Observable<any> {
    return this.http.get<Post[]>(this.apiUrl + "get-posts-by-category/" + id);
  }

  getOwner(): Observable<any>{
    return this.http.get<User>(this.apiUrl + "get-admin-owner");
  }
}
