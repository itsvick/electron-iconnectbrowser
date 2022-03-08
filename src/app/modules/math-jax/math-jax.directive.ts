import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MathJaxService } from './math-jax.service';
import { takeLast, takeUntil, take, map } from 'rxjs/operators';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { GlobalService } from '@api/services/general.service';

@Directive({
  selector: '[appMathJax]',
})
export class MathJaxDirective implements AfterViewInit {
  @Input() appMathJax: string;
  private readonly element: HTMLElement;
  private readonly mathJaxHub$: Observable<any>;
  MathJax: any;

  constructor(el: ElementRef, service: MathJaxService, public gs: GlobalService) {
    this.mathJaxHub$ = service.MathJaxHub$;
    this.element = el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.MathJax = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxHub$.pipe(take(1)).subscribe(() => {
      this.MathJax.Hub.Queue(['Typeset', this.MathJax.Hub, this.element]);
    });
  }
}
