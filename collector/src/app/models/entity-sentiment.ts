import { Entity } from './entity';

export class EntitySentiment {
  constructor(entity: Entity, sentiment: number) {
    this.entity = entity;
    this.sentiment = sentiment;
  }

  entity: Entity;
  sentiment: number;
}