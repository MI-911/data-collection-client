import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';
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
  samples: Movie[];
  
  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.loading = this.moviesService.begin().subscribe(samples => this.samples = samples);
  }

  initialResult(result: SentimentResult) {
    this.loading = this.moviesService.entities(result).subscribe(data => console.log(data));
  }
}
