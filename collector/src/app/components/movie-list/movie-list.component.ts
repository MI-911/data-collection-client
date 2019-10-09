import { MovieSentiment } from './../../models/movie-sentiment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Movie } from 'src/app/models/movie';
import { SentimentResult } from 'src/app/models/sentiment-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(300 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(300, style({opacity: 0})))
    ])
  ]
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[];
  @Output() result = new EventEmitter<SentimentResult>();

  private sentimentResult = new SentimentResult;

  constructor() { }

  ngOnInit() {
  }

  sentiment(event: MovieSentiment) {
    this.movies.splice(this.movies.indexOf(event.movie), 1);

    if (event.sentiment === 1) {
      this.sentimentResult.liked.push(event.movie.id);
    } else if (event.sentiment === -1) {
      this.sentimentResult.disliked.push(event.movie.id);
    }

    if (!this.movies.length) {
      this.result.emit(this.sentimentResult);
    }
  }
}
