import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'src/app/services/repositories.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  user : any = null;
  username : string = '';
  gl_repositories : any;
  repositories : any;
  repositoryName : string = '';
  languages : string[] = [];
  checkLang : boolean[] = [];

  constructor(private repositoriesService: RepositoriesService) { }

  ngOnInit(): void {
  }

  searchRepositories(){
    this.user = null;
    this.languages = [];
    this.repositoriesService.getData(this.username).subscribe(user => {
      this.user = user;
      this.getRepos();
    })
  }

  getRepos(){
    this.repositoriesService.getRepos(this.user.repos_url).subscribe(repos => {
      this.repositories = repos;
      this.gl_repositories = Object.assign([], this.repositories);
      let index = 0;
      this.repositories.forEach((rep : any) => {
        this.getLanguages(rep.languages_url, index);
        index ++;
      });
    })
  }

  getLanguages(url : string, index : number){
   this.repositoriesService.getLanguages(url).subscribe(languages => {
    Object.keys(languages).forEach((len : any) => {
      if(!this.languages.includes(len)){
        this.languages.push(len);
        this.checkLang.push(true);
      }
    })
    let langsAux =  Object.keys(languages);
    this.repositories[index].languages = langsAux;
   })
  }

  filterByName(){
    if(this.repositoryName && this.repositoryName != ''){
      this.repositories = Object.assign([], this.gl_repositories);
      const result = this.repositories.filter((rep : any) => rep.name.includes(this.repositoryName));
      this.repositories = result;
      let i = 0;
      this.checkLang.forEach((lang : boolean) => {
        this.checkLang[i] = true;
        i++;
      })
    }
  }

  onCheckboxChange(){
    this.filterByName();
    let result : any[] = [];
    this.repositories.filter(((rep : any) => {
        let index = -1;
        rep.included = false;
        this.checkLang.forEach((lang : boolean) => {
          index ++;
          if(lang){
            if(rep.languages.includes(this.languages[index]) && !rep.included){
              rep.included = true;
              result.push(rep);
              return;
            }          
          }  
        });
      }
    ));
    this.repositories = result;
  }

}
