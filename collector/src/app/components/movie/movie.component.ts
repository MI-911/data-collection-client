import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieSentiment } from 'src/app/models/movie-sentiment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Output() sentiment = new EventEmitter<MovieSentiment>();

  constructor() { }

  ngOnInit() {
  }

  emit(movie, sentiment) {
    this.sentiment.emit(new MovieSentiment(movie, sentiment));
  }

}
