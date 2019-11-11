import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgBusyModule, BusyConfig} from 'ng-busy';
import { EntityComponent } from './components/entity/entity.component';
import { MovieListComponent } from './components/entity-list/entity-list.component';
import { StaticFilePipe } from './pipes/static-file.pipe';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrescreenComponent } from './components/prescreen/prescreen.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityComponent,
    MovieListComponent,
    StaticFilePipe,
    PredictionsComponent,
    ProgressBarComponent,
    PrescreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgBusyModule.forRoot({
      minDuration: 100,
      delay: 50,
      backdrop: true,
      disableAnimation: true
    } as BusyConfig),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  entryComponents: [
    PrescreenComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
