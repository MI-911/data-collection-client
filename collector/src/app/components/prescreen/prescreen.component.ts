import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prescreen',
  templateUrl: './prescreen.component.html',
  styleUrls: ['./prescreen.component.css']
})
export class PrescreenComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  onClose() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}