import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from './types';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor( private http: HttpClient) { }


getSchools(): Observable<School[]>{
  return this.http.get<School[]>('/api/schools')
}


 getSearchByFieldNameResult(namefield: string): Observable<School[]>{
   return this.http.get<School[]>(`/api/schools?search=${namefield}`);
 }

}
