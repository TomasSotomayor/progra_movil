import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Método para guardar un item en el almacenamiento
  async setItem(llave: string, valor: any) {
    await Preferences.set({ key: llave, value: JSON.stringify(valor) });
  }

  // Método para obtener un item del almacenamiento
  async getItem(llave: string): Promise<any | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value ? JSON.parse(obj.value) : null;
  }

  // Método para agregar un token al almacenamiento
  async agregarToken(dataJson: any) {
    this.setItem(llaveUber, dataJson);
  }

  // Método para obtener el almacenamiento
  async obtenStorage() {
    const storageData = await this.getItem(llaveUber);
    return storageData ? storageData : [];
  }

  // Método para eliminar un item del almacenamiento (opcional)
  async removeItem(llave: string) {
    await Preferences.remove({ key: llave });
  }
}
