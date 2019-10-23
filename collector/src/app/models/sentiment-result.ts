export class SentimentResult {
    liked: string[] = [];
    disliked: string[] = [];
    unknown: string[] = [];

    resetResults() {
      this.liked = [];
      this.disliked = [];
      this.unknown = [];
    }
}
