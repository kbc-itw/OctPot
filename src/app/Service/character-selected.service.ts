import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// 選択しているキャラクターがローカルストレージのどこにあるのかをコンポーネント間で共有するためのサービスです。
export class CharacterSelectedService {

  selectedType = ''; // PC or NPC
  selectedIndex = 0; // ローカルストレージの何番目のキャラクターか

  constructor() { }
}
