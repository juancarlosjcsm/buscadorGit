import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private http: HttpClient) {

  }

  getData(username : string):Observable<any> {
    const url = "https://api.github.com/users/" + username;
    return this.http.get<any>(url);
  }
  getRepos(urlRep : string):Observable<any> {
    return this.http.get<any>(urlRep);
  }
  getLanguages(urlLanguages : string):Observable<any> {
    return this.http.get<any>(urlLanguages);
  }
}
