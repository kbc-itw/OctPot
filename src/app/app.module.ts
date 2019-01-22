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
import {MenuComponent} from './component/menu/menu.component';
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
import {MenuService} from './Service/menu-service';
import {MemoTabsComponent} from './component/memo-tabs/memo-tabs.component';
import {DiceService} from './Service/dice-service';
import { FileSharingComponent } from './component/file-sharing/file-sharing.component';
import { CharaSheetComponent } from './component/chara-sheet/chara-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreateComponent,
    CharacterManagementComponent,
    ChatRoomComponent,
    TopPageComponent,
    MenuComponent,
    ChatRoomCreateComponent,
    DiceComponent,
    MemoComponent,
    MemoTabsComponent,
    FileSharingComponent,
    CharaSheetComponent
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
    TabsManagerService,
    MenuService,
    DiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
