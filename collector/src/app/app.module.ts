import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgBusyModule} from 'ng-busy';
import { EntityComponent } from './components/entity/entity.component';
import { MovieListComponent } from './components/entity-list/entity-list.component';
import { StaticFilePipe } from './pipes/static-file.pipe';
import { TokenInterceptor } from './interceptors/token-interceptor';

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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
