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

  public numWrongPos = 0;
  public numWrongNeg = 0;

  constructor() { }

  ngOnInit() {
  }

  sentiment(event: EntitySentiment) {
    const isPositive = this.posPredictions.some(o => event.entity === o);
    const entities = isPositive ? this.posPredictions : this.negPredictions;
    const localSentimentResult = new SentimentResult();

    entities.splice(entities.indexOf(event.entity), 1);
    if (event.sentiment === 1) {
      if (!isPositive) { this.numWrongNeg++; }
      localSentimentResult.liked.push(event.entity.uri);
    } else if (event.sentiment === -1) {
      if (isPositive) { this.numWrongPos++; }
      localSentimentResult.disliked.push(event.entity.uri);
    } else {
      localSentimentResult.unknown.push(event.entity.uri);
    }

    this.result.emit(localSentimentResult);
  }
}
