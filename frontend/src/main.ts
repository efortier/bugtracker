import {platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode } from '@angular/core';
import {environment } from './environments/environment';
import {AppModule } from './app/app.module';
const configs = require('../../configs/db');

if (environment.production) {
  enableProdMode();
}

if (environment.production || configs.noLogging) {
  window.console.log = function() {};
}

platformBrowserDynamic().bootstrapModule(AppModule);
