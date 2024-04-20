import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
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
