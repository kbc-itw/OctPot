// ルームで使用するキャラクターのリストを管理するサービスです
// 追加されたキャラをコンポーネント間で受け渡しさせます。

//  ↓受け取る側の処理
// public subscription: Subscription;  // 受け取った時の処理を収納します
// ngOnInit() {
//   this.subscription = this.clistService.sharedDataSource$.subscribe(
//     data => {
//       // dataが受け取ったものです。
//       //受け取ったdataを受け取ったクラスの変数に入れるなり好きにしてください
//     }
//   );
// }


import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CharacterDataListService {

  private shareDataSource = new Subject<any>();
  public sharedDataSource$ = this.shareDataSource.asObservable();

  constructor() {}

  // Charaを登録するときにこれで送信します。
  public onNotifyShareDataChanged(updated) {
    try {
      this.shareDataSource.next(updated);
    }catch (e) {
      console.error('キャラクター管理関係でエラーが発生しました');
    }
  }
}
