import { Injectable } from '@angular/core';
import { Observer, ReplaySubject, Observable, Subject, AsyncSubject } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Defines global variables on the `window` object.
 */
declare global {
  interface Window {
    /**
     * Subject to notify the readiness of the MathJax namespace.
     */
    mathJaxHub$: Subject<any>;
  }
}

@Injectable()
export class MathJaxService {
  /**
   * Signals when the MathJax object is ready.
   */
  public readonly MathJaxHub$ = new ReplaySubject<any>();

  /**
   * Must call `init` method explicitly during module initialization.
   */
  public init(): void {
    /**
     * Create a global variable.
     */
    window.mathJaxHub$ = this.MathJaxHub$;
  }
}
