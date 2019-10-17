import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { EntitySentiment } from 'src/app/models/entity-sentiment';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity;
  @Output() sentiment = new EventEmitter<EntitySentiment>();

  constructor() { }

  ngOnInit() {
  }

  setSource(event, entity) {
    event.target.src = `https://imgplaceholder.com/182x268?text=${entity.name}`;
  }
  emit(entity, sentiment) {
    this.sentiment.emit(new EntitySentiment(entity, sentiment));
  }
}
