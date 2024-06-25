// scanner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private scannedCodeSubject = new BehaviorSubject<string>('');

  constructor() { }

  get scannedCode$() {
    return this.scannedCodeSubject.asObservable();
  }

  setScannedCode(code: string) {
    this.scannedCodeSubject.next(code);
  }

  clearScannedCode() {
    this.scannedCodeSubject.next('');
}

}
