import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, action = 'Dismiss', duration = 3000): void {
    this.snackBar.open(message, action, {
      duration
    });
  }
}

// this is for the mathjax component.
@Injectable()
export class GlobalService {
  constructor() {}

  nativeGlobal(): any {
    return window;
  }
}
