import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface LongClickEvent {
  time: number;
}

export interface LongClickConfig {
  holdClass: string;
}

@Directive({
  selector: '[appLongClick]'
})
export class LongClickDirective {
  @Input('appLongClick') config: LongClickConfig = {holdClass: null};
  @Output() longclick = new EventEmitter<LongClickEvent>();
  private pressedAt: number;

  constructor(private elementRef: ElementRef) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('mousedown') pressed(): void {
    this.pressedAt = Date.now();
    if (this.config.holdClass) { this.nativeElement.classList.add(this.config.holdClass); }
  }

  @HostListener('mouseup') released(): void {
    const releasedAt = Date.now();
    if (this.config.holdClass) { this.nativeElement.classList.remove(this.config.holdClass); }
    this.longclick.emit({time: releasedAt - this.pressedAt});
  }

  @HostListener('dragstart') preventDrag(): boolean {
    return false;
  }
}
