import { Entity } from './models/entity';
import { EntitiesService } from './services/entities.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SentimentResult } from './models/sentiment-result';

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

  constructor(private entitiesService: EntitiesService) {
  }

  ngOnInit(): void {
    this.loading = this.entitiesService.begin().subscribe(samples => this.samples = samples);
  }

  initialResult(result: SentimentResult) {
    this.loading = this.entitiesService.entities(result).subscribe(data => {
      if (data['prediction']) {
        this.posPredictions = data['likes'] as Entity[]; 
        this.negPredictions = data['dislikes'] as Entity[];
      } else {
        this.samples = data;
      }
    });
    result.reset_results();
  }
}
