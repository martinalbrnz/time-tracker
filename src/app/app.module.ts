import localeEsAr from '@angular/common/locales/es-AR';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '@services/login/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeEsAr, 'es-AR');

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
  providers: [LoginService, HttpClient, { provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent],
  exports: [HeaderComponent]
})
export class AppModule { }
