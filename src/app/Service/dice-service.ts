import {Injectable} from '@angular/core';

@Injectable()
export class DiceService {
  // @ts-ignore
  constructor() {}

  roll(word) {
    let result = [];
    let result2;
    if (word.match(/^[0-9]{1,}d[0-9]{1,}$/i) !== null) {
      // 比較なしのdice振り
      result[0] = this.calculation(word);
      console.log(result[0]);
      result[1] = '(' + result[0].fm + ')' + '=' + result[0].sum;
      console.log(result[1]);
      result[2] = word;
      console.log('result', result);
      console.log('0', result[0]);
      console.log('1', result[1]);
      console.log('2', result[2]);
      return result;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}<[0-9]{1,}$/i) !== null) {
      // 以降、比較あり
      result[0] = this.jude(word, '<');
      console.log(result[0]);
      result2 = result[0].result_num + ':' + result[0].result_word;
      result[1] = result2;
      result[2] = result[0].reword;
      console.log('0', result[0]);
      console.log('1', result[1]);
      console.log('2', result[2]);
      return result;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}>[0-9]{1,}$/i) !== null) {
      result[0] = this.jude(word, '>');
      console.log(result[0]);
      result2 = result[0].result_num + ':' + result[0].result_word;
      result[1] = result2;
      result[2] = result[0].reword;
      return result;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}<=[0-9]{1,}$/i) !== null) {
      result[0] = this.jude(word, '<=');
      console.log(result[0]);
      result2 = result[0].result_num + ':' + result[0].result_word;
      result[1] = result2;
      result[2] = result[0].reword;
      return result;
    } else if (word.match(/^[0-9]{1,}d[0-9]{1,}>=[0-9]{1,}$/i) !== null) {
      result[0] = this.jude(word, '>=');
      console.log(result[0]);
      result2 = result[0].result_num + ':' + result[0].result_word;
      result[1] = result2;
      result[2] = result[0].reword;
      return result;
    } else {
      console.log('しっぱい！');
      return undefined;
    }
  }
  calculation(word) {
    let fst = word.match(/[0-9]{1,}d/i)[0];
    console.log('fst: ' + fst);
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
    return {fm: fm, sum: sum};
  }
  jude(word, symbol) {
    console.log('---------------------jude------------------------');
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
      if (result.sum < match_num) {
        // result_word = '失敗しました。';
        result_word = '失敗';
      }else {
        result_word = '成功';
      }
      var reword = word.match(/[0-9]{1,}d[0-9]{1,}/i)[0];
      console.log(reword);
      return {result_num: result.sum , result_word: result_word, reword: reword};
    } else if (symbol === '>' || symbol === '>=') {
      var num;
      if (symbol === '>') {
        num = word.match(/>[0-9]{1,}/i)[0];
      } else if (symbol === '>=') {
        num = word.match(/>=[0-9]{1,}/i)[0];
      }
      var match_num = Number(num.replace(/[^0-9]/g, ''));
      if (result.sum > match_num || result.sum === match_num) {
        result_word = '成功';
      }else {
        result_word = '失敗';
      }
      var reword = word.match(/[0-9]{1,}d[0-9]{1,}/i)[0];
      console.log(reword);
      return {result_num: result.sum , result_word: result_word, reword: reword};
    }
  }
}
