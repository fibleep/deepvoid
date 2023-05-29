import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BeachViewComponent } from './beach-view/beach-view.component';
import { DeepViewComponent } from './deep-view/deep-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BeachViewComponent,
    DeepViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
