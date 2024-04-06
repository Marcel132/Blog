import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"blog-app-b711b","appId":"1:732180813490:web:371f7916073eb49e195bab","storageBucket":"blog-app-b711b.appspot.com","apiKey":"AIzaSyC9JOF51DQIdKgJusxjf57K29yn7z5myUc","authDomain":"blog-app-b711b.firebaseapp.com","messagingSenderId":"732180813490"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFunctions(() => getFunctions())), importProvidersFrom(provideMessaging(() => getMessaging())), importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())), provideAnimationsAsync()]
};
