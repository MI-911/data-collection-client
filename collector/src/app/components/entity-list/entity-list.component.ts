import { EntitySentiment } from '../../models/entity-sentiment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Entity } from 'src/app/models/entity';
import { SentimentResult } from 'src/app/models/sentiment-result';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(250 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(250, style({opacity: 0})))
    ])
  ]
})

export class MovieListComponent implements OnInit {
  @Input() entities: Entity[];
  @Output() result = new EventEmitter<SentimentResult>();

  private sentimentResult = new SentimentResult;
  private nCurrent: number = 0;
  private nMax: number = 30;

  constructor() { }

  ngOnInit() {
  }

  sentiment(event: EntitySentiment) {
    this.entities.splice(this.entities.indexOf(event.entity), 1);

    if (event.sentiment === 1) {
      this.nCurrent++;
      this.sentimentResult.liked.push(event.entity.uri);
    } else if (event.sentiment === -1) {
      this.nCurrent++;
      this.sentimentResult.disliked.push(event.entity.uri);
    } else {
      this.sentimentResult.unknown.push(event.entity.uri);
    }

    if (!this.entities.length) {
      this.result.emit(this.sentimentResult);
    }
  }
}
