import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CharacterCreateComponent } from './characterCreate.component';
import { CharacterManagementComponent } from './CharacterManagement.component';
import { ChatRoomComponent } from './chatRoom.component';

const myRoutes = [
  { path: '', component: AppComponent },
  { path: 'create', component: CharacterCreateComponent },
  { path: 'managemant', component: CharacterManagementComponent },
  { path: 'chat', component: ChatRoomComponent }
  // { path: '**', component: ErrorComponent} 予想外のパスにつないだ時のコンポーネント
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
