import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit } from '@angular/core';
import { GlobalService } from '@api/services/general.service';

@Component({
  selector: 'mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.scss'],
})
export class MathjaxComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() content: string;
  ID: string;

  constructor(public gs: GlobalService) {}
  MathJax;

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['content']) {
    //   this.renderMath();
    // }
  }

  renderMath() {
    // this.MathJax = this.gs.nativeGlobal()['MathJax'];
    // const angObj = this;
    if (this.hasElement()) {
      this.MathJax.Hub.Queue(['Typeset',this. MathJax.Hub, this.ID]);
    } else {
      setTimeout(() => {
        this.renderMath();
      }, 50);
      console.log(this.ID);
      console.log(document.getElementById(this.ID));
    }
  }

  hasElement() {
    const element = document.getElementById(this.ID);
    if (element) {
      return true;
    } else {
      return false;
    }
  }

  loadMathConfig() {
    this.MathJax = this.gs.nativeGlobal()['MathJax'];
    this.MathJax.Hub.Config({
      showMathMenu: false,
      showProcessingMessages: false,
      tex2jax: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
      },
      menuSettings: { zoom: 'Double-Click', zscale: '150%' },
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
    });
  }

  ngOnInit() {
    this.ID = Math.random().toString(36).substring(2);
    this.loadMathConfig();
  }

  ngAfterViewInit() {
    this.renderMath();
  }
}
