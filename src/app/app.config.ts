import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

import {firebaseConfig} from '../environments/environment.prod';
import {FirebaseApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {initializeAuth, provideAuth, indexedDBLocalPersistence, Auth } from '@angular/fire/auth';
import {Firestore, getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp((): FirebaseApp => initializeApp(firebaseConfig)),
    provideFirestore((): Firestore => getFirestore()),
    provideAuth((): Auth => {
      return initializeAuth(initializeApp(firebaseConfig), {
        persistence: indexedDBLocalPersistence
      });
    }),
  ]
};
