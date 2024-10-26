import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave: string, valor: any) {
    await Preferences.set({ key: llave, value: JSON.stringify(valor) });
  }

  async getItem(llave: string): Promise<any | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value ? JSON.parse(obj.value) : null;
  }

  async agregarToken(dataJson: any) {
    this.setItem(llaveUber, dataJson);
  }

  async obtenStorage() {
    const storageData = await this.getItem(llaveUber);
    return storageData ? storageData : [];
  }
}
