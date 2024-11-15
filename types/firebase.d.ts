import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
    }
  }
}

export { }