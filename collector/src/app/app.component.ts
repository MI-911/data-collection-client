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
  predictions: Map<string, Entity[]>;

  constructor(private entitiesService: EntitiesService) {
  }

  ngOnInit(): void {
    this.loading = this.entitiesService.begin().subscribe(samples => this.samples = samples);
  }

  initialResult(result: SentimentResult) {
    this.loading = this.entitiesService.entities(result).subscribe(data => {
      if (data['prediction']) {
        this.predictions = new Map<string, Entity[]>();
        this.predictions.set('likes', data['likes']); 
        this.predictions.set('dislikes', data['dilikes']);
      } else {
        this.samples = data;
      }
    });
    result.reset_results();
  }
}
