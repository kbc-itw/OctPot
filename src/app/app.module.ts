import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MY_ROUTES } from './app.routing';

import { TopComponent } from './top.component';
import { AppComponent } from './app.component';
import { CharacterCreateComponent } from './character-create.component';
import { CharacterManagementComponent } from './character-management.component';
import { ChatRoomComponent } from './chat-room.component';
import { TopPageComponent } from './top-page/top-page.component';


@NgModule({
  declarations: [
    AppComponent, CharacterCreateComponent, CharacterManagementComponent, ChatRoomComponent, TopComponent, TopPageComponent
  ],
  imports: [
    BrowserModule, FormsModule, MY_ROUTES
  ],
  providers: [],
  bootstrap: [TopComponent]
})
export class AppModule { }
