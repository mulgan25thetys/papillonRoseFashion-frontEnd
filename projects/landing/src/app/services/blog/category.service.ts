import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = environment.apiURL+"/prf/categories/";

  constructor(private http:HttpClient) { }

  findAll():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl+"find-all/")
  }
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl+"get-categories")
  }

  getCategory(id:number) :Observable<any>{
    return this.http.get<Category>(this.apiUrl + "get-category/"+id);
  }

  deleteCategory(id:any):Observable<any> {
    return this.http.delete<Category>(this.apiUrl + "delete-category/" + id);
  }

  addCategory(category:Category) :Observable<any>{
    return this.http.post<Category>(this.apiUrl + "add-category", category);
  }

  editCategory(category:Category) :Observable<any>{
    return this.http.put<Category>(this.apiUrl + "edit-category", category);
  }
}
