import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() highlightColor: string;


  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  ngOnInit(): void {
    // this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
