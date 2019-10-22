import { Component, OnInit, Input } from '@angular/core';
import { Entity } from 'src/app/models/entity';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {
  @Input() negPredictions: Entity[];
  @Input() posPredictions: Entity[];

  constructor() { }

  ngOnInit() {
    
  }

}