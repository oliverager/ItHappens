import { AppComponent } from './app/app.component';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ProfilePageModule} from "./app/profile-page/profile-page.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(ProfilePageModule)
  .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, ToastModule),
    provideRouter(routes),
    MessageService, provideAnimationsAsync()
  ]
})
  .catch(err => console.error(err));
