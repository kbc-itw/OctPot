import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TopPageComponent} from './component/top-page/top-page.component';
import {CharacterCreateComponent} from './component/character-create/character-create.component';
import {CharacterManagementComponent} from './component/character-management/character-management.component';
import {ChatRoomComponent} from './component/chat-room/chat-room.component';
import {ChatRoomCreateComponent} from './component/chat-room-create/chat-room-create.component';
import {MemoTabsComponent} from './component/memo-tabs/memo-tabs.component';
import {CharacterjsonToHtmlComponent} from './component/characterjson-to-html/characterjson-to-html.component';
import {CharacterEditComponent} from './component/character-edit/character-edit.component';

const myRoutes = [
  {path: '', component: TopPageComponent},
  {path: 'character-create', component: CharacterCreateComponent},
  {path: 'management', component: CharacterManagementComponent},
  {path: 'chat-room', component: ChatRoomComponent},
  {path: 'create-chat-room', component: ChatRoomCreateComponent},
  {path: 'memo-tabs', component: MemoTabsComponent},
  {path: 'view-characterjson', component: CharacterjsonToHtmlComponent},
  {path: 'character-edit', component: CharacterEditComponent}
  // { path: '**', component: ErrorComponent} 予想外のパスにつないだ時のコンポーネント
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
