import {Component, OnInit} from '@angular/core';
import {DiceService} from '../../Service/dice-service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  word;
  result = [];

  // @ts-ignore
  constructor(private dice: DiceService) {}
  ngOnInit() {
  }
  roll() {
    console.log('roll');
    console.log(this.word);
    if (this.word !== null && this.word !== undefined && this.word !== '') {
      if (this.dice.roll(this.word) !== undefined) {
        this.result.push(this.word + ' => ' + this.dice.roll(this.word));
      }
    }
    this.word = null;
  }
}
