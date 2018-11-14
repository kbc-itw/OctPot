import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopPageComponent } from './Service/top-page.component';
import { CharacterCreateComponent } from './component/character-create/character-create.component';
import { CharacterManagementComponent } from './component/character-management/character-management.component';
import { ChatRoomComponent } from './component/chat-room/chat-room.component';
import { ChatRoomCreateComponent } from './component/chat-room-create/chat-room-create.component';

const myRoutes = [
  { path: '', component: TopPageComponent },
  { path: 'create', component: CharacterCreateComponent },
  { path: 'management', component: CharacterManagementComponent },
  { path: 'chat-room', component: ChatRoomComponent },
  { path: 'create-chat-room', component: ChatRoomCreateComponent },
  // { path: '**', component: ErrorComponent} 予想外のパスにつないだ時のコンポーネント
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
