import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-replay-options',
  templateUrl: './replay-options.component.html'
})
export class ReplayOptionsComponent implements OnInit {
  @Output() restart = new EventEmitter();
  @Output() recommend = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
