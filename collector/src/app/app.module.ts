import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgBusyModule} from 'ng-busy';
import { EntityComponent } from './components/entity/entity.component';
import { MovieListComponent } from './components/entity-list/entity-list.component';
import { StaticFilePipe } from './pipes/static-file.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EntityComponent,
    MovieListComponent,
    StaticFilePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgBusyModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
