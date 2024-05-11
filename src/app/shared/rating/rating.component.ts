import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ir-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1,2,3,4,5];
  rate: number = 0;
  prevRate: number;

  constructor() { }

  ngOnInit() {
  }

  setRate(r: number){
    this.rate = r;
    this.prevRate = undefined;
    this.rated.emit(this.rate);
  }

  setTempRate(r: number){
    if(this.prevRate === undefined){
      this.prevRate = this.rate;
    }
    this.rate = r;
  }

  clearTempRate(){
    if(this.prevRate !== undefined){
      this.rate = this.prevRate;
      this.prevRate = undefined;
    }
  }
}
