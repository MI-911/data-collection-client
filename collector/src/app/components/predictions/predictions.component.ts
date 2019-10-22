import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { SentimentResult } from 'src/app/models/sentiment-result';
import { EntitySentiment } from 'src/app/models/entity-sentiment';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {
  @Input() negPredictions: Entity[];
  @Input() posPredictions: Entity[];
  @Output() result = new EventEmitter<SentimentResult>();

  private sentimentResult = new SentimentResult;

  constructor() { }

  ngOnInit() {
    
  }

  sentiment(event: EntitySentiment) {
    let entities = this.posPredictions.some(o => event.entity == o) ? this.posPredictions : this.negPredictions;

    entities.splice(entities.indexOf(event.entity), 1);

    if (event.sentiment === 1) {
      this.sentimentResult.liked.push(event.entity.uri);
    } else if (event.sentiment === -1) {
      this.sentimentResult.disliked.push(event.entity.uri);
    } else {
      this.sentimentResult.unknown.push(event.entity.uri);
    }

    if (!entities.length) {
      this.result.emit(this.sentimentResult);
    }
  }
}
