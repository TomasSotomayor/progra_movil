import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave: string, valor:string) {
  await Preferences.set({key:llave,value:valor});
  }

  async getItem(llave:string){
    const obj = await Preferences.get({key:llave})
    return obj;
  }

  async agregartoken(dataJson:any){
    this.setItem(llaveUber,JSON.stringify(dataJson));
  }


  async obtenerStorage(){
    const storageData = await this.getItem(llaveUber);
    if (storageData == null){
      return [];
  }else{
    let obj = JSON.parse(storageData);
    return JSON.parse(storageData);


  }
  }
}
