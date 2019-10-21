export class SentimentResult {
    liked: string[] = [];
    disliked: string[] = [];
    unknown: string[] = [];

    reset_results() {
      this.liked = [];
      this.disliked = [];
      this.unknown = [];
    }
}
