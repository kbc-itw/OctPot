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
      var roll = this.dice.roll(this.word);
      if (roll[1] !== undefined) {
        this.result.push(roll[2] + '->' + roll[1]);
      }
    }
    this.word = null;
  }
  imgRoll(rollDice : string) {
    var roll = this.dice.roll(rollDice);
    this.result.push(roll[2] + '->' + roll[1]);
    return null;
  }
}
