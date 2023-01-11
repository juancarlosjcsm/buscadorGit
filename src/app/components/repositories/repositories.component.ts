import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  @Input() repositories : any;

  orderStar : boolean = true;
  orderName : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sortDataByName(){
    if(this.orderName)
      this.repositories.sort((a : any,b : any) => a.name.localeCompare(b.name));
    else
      this.repositories.sort((a : any,b : any) => b.name.localeCompare(a.name));

      this.orderName = !this.orderName;
  }
  sortDataByStars(){
    if(this.orderStar)
      this.repositories.sort((a : any,b : any) => a.stargazers_count - b.stargazers_count);
    else
      this.repositories.sort((a : any,b : any) => b.stargazers_count - a.stargazers_count);

      this.orderStar = !this.orderStar;
  }
}
