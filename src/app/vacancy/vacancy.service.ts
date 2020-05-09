import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VacancyService {
  private baseUrl = "https://hr-module-service.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  get(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vacancy/${id}`);
  }

  // tslint:disable-next-line: ban-types
  create(vacancy: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/vacancy`, vacancy);
  }

  // tslint:disable-next-line: ban-types
  update(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/vacancy/${id}`, value);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vacancy/${id}`, { responseType: "text" });
  }

  getList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vacancies`);
  }
}
