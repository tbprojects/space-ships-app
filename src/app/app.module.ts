import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorageModule } from './local-storage/local-storage.module';
import { AppComponent } from './app.component';
import { SpaceModule } from './space/space.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LocalStorageModule.forRoot({prefix: 'space'}),
    SpaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
