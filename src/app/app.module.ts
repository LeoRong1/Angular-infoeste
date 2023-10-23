import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home';

import {  ListaFormDialogComponent } from './components/lista/lista-form-dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import firebaseConfig from 'src/firebase-config';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeComponent,
    ListaFormDialogComponent,
    ConfirmDialogComponent,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
