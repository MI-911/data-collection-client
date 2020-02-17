import { SessionService } from './services/session.service';
import { Entity } from './models/entity';
import { EntitiesService } from './services/entities.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SentimentResult } from './models/sentiment-result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrescreenComponent } from './components/prescreen/prescreen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loading: Subscription;
  samples: Entity[];
  negPredictions: Entity[];
  posPredictions: Entity[];
  showError: boolean;
  done: boolean;

  constructor(
    private entitiesService: EntitiesService,
    private modalService: NgbModal,
    private sessionService: SessionService) {
  }

  restart() {
    this.done = false;
    this.sessionService.startSession();
    this.loadMovies();
  }

  ngOnInit(): void {
    this.loadMovies();

    if (this.sessionService.firstSession) {
      this.modalService.open(PrescreenComponent, {size: 'lg'});
    }
  }

  loadMovies() {
    this.loading = this.entitiesService.movies().subscribe(samples => {
      this.samples = samples;

      this.posPredictions = null;
      this.negPredictions = null;
    }, error => this.showError = true);
  }

  initialResult(result: SentimentResult) {
    if (this.posPredictions || this.negPredictions) {
      this.entitiesService.final(result).subscribe();
    } else {
      this.loading = this.entitiesService.feedback(result).subscribe(data => {
        if (data.prediction) {
          this.posPredictions = data.likes as Entity[];
          this.negPredictions = data.dislikes as Entity[];
        } else {
          this.samples = data;
        }
      });

      result.resetResults();
    }
  }
}
