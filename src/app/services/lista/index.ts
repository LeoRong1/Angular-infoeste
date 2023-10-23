import { Injectable } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { UuidGeneratorService } from '../uuid-generator';
import { Firestore, collection, collectionData, setDoc, doc, getDocs,deleteDoc } from '@angular/fire/firestore'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private localStorageKey: string = 'listas';
  constructor(
    private _uuidService: UuidGeneratorService,
    private firestore: Firestore
  ) { }

  private _getFromStorage() {
    const listasStorage = localStorage.getItem(this.localStorageKey);

    return listasStorage ? JSON.parse(listasStorage) : {};
  }

  private _getFromFireStore(){
    const db = collection(this.firestore, this.localStorageKey);

    return getDocs(db);
  }

  private _saveIntoStorage(listas: {} = {}) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(listas));
  }
  
  private _saveIntoFireStorage(lista: Lista){
    const db = collection(this.firestore, this.localStorageKey);
   return setDoc(doc(db, lista.id), JSON.parse(JSON.stringify(lista)));
  }

  save(lista: Lista) {
    const model = new Lista(lista);
   // const listasObj = this._getFromStorage();
   if (!model.id) {
      model.id = this._uuidService.generateUuid();
    }
    //listasObj[model.id] = model;
    //this._saveIntoStorage(listasObj);
    this._saveIntoFireStorage(model);
  }

  remove(lista: Lista) {
    const model = new Lista(lista);

    if (!model.id) {
      return;
    }
    const db = collection(this.firestore, this.localStorageKey);
    return deleteDoc(doc(db,lista.id))
  }

  async getListas() {
    const listasObj = await this._getFromFireStore();
    
    return listasObj.docs.map((documento) => {
      return new Lista(documento.data())
    });
    console.log(listasObj.docs);
  }
}
