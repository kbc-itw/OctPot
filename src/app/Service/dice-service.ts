import {Injectable} from '@angular/core';

@Injectable()
export class DiceService {
  // @ts-ignore
  constructor() {}

  roll(word) {
    if (word.match(/^[0-9]{1,}d[0-9]{1,}$/i) !== null) {
      // 比較なしのdice振り
      return this.calculation(word);
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}<[0-9]{1,}$/i) !== null) {
      // 以降、比較あり
      var result = this.jude(word, '<');
      console.log(result);
      var result2 = result.result_num + ': ' + result.result_word;
      return result2;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}>[0-9]{1,}$/i) !== null) {
      var result = this.jude(word, '>');
      console.log(result);
      var result2 = result.result_num + ': ' + result.result_word;
      return result2;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}<=[0-9]{1,}$/i) !== null) {
      var result = this.jude(word, '<=');
      console.log(result);
      var result2 = result.result_num + ': ' + result.result_word;
      return result2;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}>=[0-9]{1,}$/i) !== null) {
      var result = this.jude(word, '>=');
      console.log(result);
      var result2 = result.result_num + ': ' + result.result_word;
      return result2;
    } else {
      console.log('しっぱい！');
      return undefined;
    }
  }
  calculation(word) {
    let fst = word.match(/[0-9]{1,}d/i)[0];
    let num = Number(fst.replace(/[^0-9]/g, ''));

    let snd = word.match(/d[0-9]{1,}/i)[0];
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
    console.log(fm + ' = ' + sum);
    return sum;
  }
  jude(word, symbol) {
    var result = this.calculation(word);
    var result_word = '';
    if (symbol === '<' || symbol === '<=') {
      var num;
      if (symbol === '<') {
        num = word.match(/<[0-9]{1,}/i)[0];
      }else if (symbol === '<=') {
        num = word.match(/<=[0-9]{1,}/i)[0];
      }
      var match_num = Number(num.replace(/[^0-9]/g, ''));
      if (result < match_num) {
        // result_word = '失敗しました。';
        result_word = '失敗しました。';
      }else {
        result_word = '成功しました。';
      }
      return {result_num: result, result_word: result_word};
    } else if (symbol === '>' || symbol === '>=') {
      var num;
      if (symbol === '>') {
        num = word.match(/>[0-9]{1,}/i)[0];
      } else if (symbol === '>=') {
        num = word.match(/>=[0-9]{1,}/i)[0];
      }
      var match_num = Number(num.replace(/[^0-9]/g, ''));
      if (result > match_num || result === match_num) {
        result_word = '成功しました。';
      }else {
        result_word = '失敗しました。';
      }
      return {result_num: result, result_word: result_word};
    }
  }
}
