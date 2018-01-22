import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopPageComponent } from './top-page/top-page.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterManagementComponent } from './character-management/character-management.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const myRoutes = [
  { path: '', component: TopPageComponent },
  { path: 'create', component: CharacterCreateComponent },
  { path: 'managemant', component: CharacterManagementComponent },
  { path: 'chat', component: ChatRoomComponent }
  // { path: '**', component: ErrorComponent} 予想外のパスにつないだ時のコンポーネント
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
