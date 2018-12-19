import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  // @ts-ignore
  constructor(
    private renderer: Renderer2,
  ) {
  }

  // @ts-ignore
  @ViewChild('dice') memor: ElementRef;

  roll() {

    let input: HTMLInputElement = <HTMLInputElement>document.getElementById('dice');
    if (input.value.match(/^[0-9]{1,}d[0-9]{1,}$/i) != null) {
      let fst = input.value.match(/[0-9]{1,}d/i)[0];
      let num = Number(fst.replace(/[^0-9]/g, ''));

      let snd = input.value.match(/d[0-9]{1,}/i)[0];
      let max = Number(snd.replace(/[^0-9]/g, ''));
      let sum = 0;
      let fm = '';
      let dice = Math.floor(Math.random() * max + 1);
      sum += dice;
      fm += dice;
      let rep = dice;
      let brep = false;

      for (let i = 1; i < num; i++) {
        dice = Math.floor(Math.random() * max + 1);
        sum += dice;
        fm += ' + ' + dice;
        if (rep !== dice) {
          brep = true;
        }

      }
      var srep = '';
      if (!brep) {
        srep = ' ぞろ目！';
      }
      console.log(fm + ' = ' + sum);

      let p = this.renderer.createElement('p');
      p.innerHTML = fm + ' = ' + sum + srep;
      this.renderer.appendChild(this.memor.nativeElement, p);

    } else {
      console.log('しっぱい！');
      let p = this.renderer.createElement('p');
      p.innerHTML = 'しっぱい！';
      this.renderer.appendChild(this.memor.nativeElement, p);

    }
  }

  ngOnInit() {
  }

}
