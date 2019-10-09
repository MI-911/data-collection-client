import { Movie } from './movie';

export class MovieSentiment {
    constructor(movie: Movie, sentiment: number) {
        this.movie = movie;
        this.sentiment = sentiment;
    }

    movie: Movie;
    sentiment: number;
}