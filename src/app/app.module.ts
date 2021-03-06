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
import {FileSharingComponent} from './component/file-sharing/file-sharing.component';

import {CharacterCreateService} from './Service/character-create.service';
import {CharacterManagementService} from './Service/character-management.service';
import {ChatRoomService} from './Service/chat-room-service';
import {ChatRoomCreateService} from './Service/chat-room-create.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatSidenavModule, MatTabsModule} from '@angular/material';
import {SwitchTabService} from './Service/switch-tab.service';
import {TabsManagerService} from './Service/tabs-manager.service';
import {MenuService} from './Service/menu-service';
import {MemoTabsComponent} from './component/memo-tabs/memo-tabs.component';
import {CharacterjsonToHtmlComponent} from './component/characterjson-to-html/characterjson-to-html.component';
import {SideBarComponent} from './component/side-bar/side-bar.component';
import {CharacterEditComponent} from './component/character-edit/character-edit.component';
import {DiceService} from './Service/dice-service';
import {FileSharingService} from './Service/file-sharing.service';
import {CharaSheetComponent} from './component/chara-sheet/chara-sheet.component';
import {StatusComponent} from './component/status/status.component';
import {CharacterDataListService} from './Service/character-data-list.service';
import { CharaAbilityComponent } from './component/chara-ability/chara-ability.component';

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
    CharacterjsonToHtmlComponent,
    SideBarComponent,
    CharacterEditComponent,
    FileSharingComponent,
    CharaSheetComponent,
    StatusComponent,
    CharaAbilityComponent
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
    MatCardModule,
    MatSidenavModule
  ],
  providers: [
    CharacterCreateService,
    CharacterManagementService,
    ChatRoomService,
    ChatRoomCreateService,
    SwitchTabService,
    TabsManagerService,
    MenuService,
    DiceService,
    FileSharingService,
    CharacterDataListService,
    ChatRoomCreateComponent,
    CharaSheetComponent,
    MenuComponent,
    ChatRoomComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
