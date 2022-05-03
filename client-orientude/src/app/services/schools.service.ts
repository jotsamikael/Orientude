import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  domain = "http://localhost:3000";
  constructor(private http : HttpClient) { }

  getAllSchools(){
    return this.http.get(this.domain +'/schoolRoute/getAllSchools');
  }
}
