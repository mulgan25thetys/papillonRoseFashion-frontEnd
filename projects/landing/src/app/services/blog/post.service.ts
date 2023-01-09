import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Category } from '../../models/category';
import { Post } from '../../models/post';

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

  findAll():Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl+"find-all-published/")
  }

  getPostsByCategory(id:any):Observable<any> {
    return this.http.get<Post[]>(this.apiUrl + "get-posts-by-category/" + id);
  }
}
