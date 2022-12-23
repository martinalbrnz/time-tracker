import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '@services/login/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [LoginService, HttpClient],
  bootstrap: [AppComponent],
  exports: [HeaderComponent]
})
export class AppModule { }
