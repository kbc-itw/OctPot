import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MY_ROUTES} from './app.routing';

import {AppComponent} from './app.component';
import {CharacterCreateComponent} from './component/character-create/character-create.component';
import {CharacterManagementComponent} from './component/character-management/character-management.component';
import {ChatRoomComponent} from './component/chat-room/chat-room.component';
import {TopPageComponent} from './component/top-page/top-page.component';
import {ChatRoomCreateComponent} from './component/chat-room-create/chat-room-create.component';
import {DiceComponent} from './component/dice/dice.component';
import {MemoComponent} from './component/memo/memo.component';

import {CharacterCreateService} from './Service/character-create.service';
import {CharacterManagementService} from './Service/character-management.service';
import {ChatRoomService} from './Service/chat-room-service';
import {ChatRoomCreateService} from './Service/chat-room-create.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatTabsModule} from '@angular/material';
import {SwitchTabService} from './Service/switch-tab.service';
import {TabsManagerService} from './Service/tabs-manager.service';
import {MemoTabsComponent} from './component/memo-tabs/memo-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreateComponent,
    CharacterManagementComponent,
    ChatRoomComponent,
    TopPageComponent,
    ChatRoomCreateComponent,
    DiceComponent,
    MemoComponent,
    MemoTabsComponent
  ],
  entryComponents: [
    MemoComponent,
    DiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MY_ROUTES,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [
    CharacterCreateService,
    CharacterManagementService,
    ChatRoomService,
    ChatRoomCreateService,
    SwitchTabService,
    TabsManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
