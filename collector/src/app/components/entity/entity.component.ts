import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { EntitySentiment } from 'src/app/models/entity-sentiment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity;
  @Input() withOptions: boolean = true;
  @Output() sentiment = new EventEmitter<EntitySentiment>();
  image: string;

  constructor() { }

  ngOnInit() {
    if (this.entity.imdb) {
      this.image = `${environment.staticUrl}/${this.entity.imdb}`;
    } else {
      this.image = this.getDefault();
    }
  }

  showSummary() {
    alert(this.entity.summary);
  }

  private getDefault() {
    return `https://dummyimage.com/182x268/9ea1ff/00000.png?text=${this.entity.name}`;
  }

  setSource(event) {
    event.target.src = this.getDefault();
  }

  emit(entity, sentiment) {
    this.sentiment.emit(new EntitySentiment(entity, sentiment));
  }
}
