import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RepositoriesService } from './services/repositories.service';
import { SearcherComponent } from './components/searcher/searcher.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    SearcherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RepositoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
