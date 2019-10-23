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
  public numWrongPos = 0;
  public numWrongNeg = 0;

  constructor() { }

  ngOnInit() {
    
  }

  sentiment(event: EntitySentiment) {
    let isPositive = this.posPredictions.some(o => event.entity == o);
    let entities = isPositive ? this.posPredictions : this.negPredictions;

    entities.splice(entities.indexOf(event.entity), 1);

    if (event.sentiment === 1) {
      this.sentimentResult.liked.push(event.entity.uri);
      if (!isPositive) this.numWrongNeg++;
    } else if (event.sentiment === -1) {
      if (isPositive) this.numWrongPos++;
      this.sentimentResult.disliked.push(event.entity.uri);
    } else {
      this.sentimentResult.unknown.push(event.entity.uri);
    }

    if (!entities.length) {
      this.result.emit(this.sentimentResult);
    }
  }
}
