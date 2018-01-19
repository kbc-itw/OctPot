import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MY_ROUTES } from './app.routing';

import { TopComponent } from './top.component';
import { AppComponent } from './app.component';
import { CharacterCreateComponent } from './characterCreate.component';
import { CharacterManagementComponent } from './CharacterManagement.component';
import { ChatRoomComponent } from './chatRoom.component';


@NgModule({
  declarations: [
    AppComponent, CharacterCreateComponent, CharacterManagementComponent, ChatRoomComponent, TopComponent
  ],
  imports: [
    BrowserModule, FormsModule, MY_ROUTES
  ],
  providers: [],
  bootstrap: [TopComponent]
})
export class AppModule { }
