import { SessionService } from './../../services/session.service';
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
    trigger('fade', [
      transition(':leave', [
        animate('300ms ease-in', style({height: 0, opacity: 0}))
      ])
    ])
  ]
})

export class MovieListComponent implements OnInit {
  @Input() entities: Entity[];
  @Output() finished = new EventEmitter<SentimentResult>();

  private sentimentResult = new SentimentResult();
  public nMax = 15;
  private nLiked = 0;
  private nDisliked = 0;

  constructor() { }

  ngOnInit() {
  }

  sentiment(event: EntitySentiment) {
    this.entities.splice(this.entities.indexOf(event.entity), 1);

    if (event.sentiment === 1) {
      this.nLiked++;
      this.sentimentResult.liked.push(event.entity.uri);
    } else if (event.sentiment === -1) {
      this.nDisliked++;
      this.sentimentResult.disliked.push(event.entity.uri);
    } else {
      this.sentimentResult.unknown.push(event.entity.uri);
    }

    if (!this.entities.length) {
      this.finished.emit(this.sentimentResult);
    }
  }

  // Stops counting up liked/disliked if we have more than we need
  public get progress(): number {
    return this.nLiked + this.nDisliked;
  }

  public get progressMsg(): string {
    const remaining = this.nMax - (this.nLiked + this.nDisliked);
    return `${remaining < 0 ? 0 : remaining} remaining`;
  }
}
