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
  title = 'Data Collector';
  loading: Subscription;
  samples: Entity[];
  negPredictions: Entity[];
  posPredictions: Entity[];
  showPreScreen: boolean;

  constructor(
    private entitiesService: EntitiesService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loading = this.entitiesService.begin().subscribe(samples => this.samples = samples);
    this.modalService.open(PrescreenComponent, {size: 'lg'});
  }

  initialResult(result: SentimentResult) {
    if (this.posPredictions || this.negPredictions) {
      this.entitiesService.entities(result);
      return;
    }

    this.loading = this.entitiesService.entities(result).subscribe(data => {
      if (data['prediction']) {
        this.posPredictions = data['likes'] as Entity[];
        this.negPredictions = data['dislikes'] as Entity[];
      } else {
        this.samples = data;
      }
    });
    result.resetResults();
  }
}
