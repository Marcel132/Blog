// * This servie is responsible for user's local storage
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // There are several function that setting, getting oraz clearing local storage
  private sessionData: any = {}

  set(key:string, value:any){
    localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  clear() {
    localStorage.clear()
  }
}
