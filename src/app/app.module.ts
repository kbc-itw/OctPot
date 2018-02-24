import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MY_ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterManagementComponent } from './character-management/character-management.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { TopPageComponent } from './top-page/top-page.component';

import { CharacterCreateService } from './character-create/character-create.service';
import { CharacterManagementService } from './character-management/character-management.service';

@NgModule({
  declarations: [
    AppComponent, CharacterCreateComponent, CharacterManagementComponent, ChatRoomComponent, TopPageComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, MY_ROUTES
  ],
  providers: [ CharacterCreateService, CharacterManagementService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
