import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { EnemyComponent } from './enemy/enemy.component';
import { HudComponent } from './hud/hud.component';
import { CoinElementComponent } from './coin-element/coin-element.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    EnemyComponent,
    HudComponent,
    CoinElementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
