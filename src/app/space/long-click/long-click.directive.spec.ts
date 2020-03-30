import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockRender } from 'ng-mocks';
import { LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let fixture: ComponentFixture<any>;
  let host: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongClickDirective]
    });

    spyOn(window, 'alert');
    fixture = MockRender(`
      <button [appLongClick]="{holdClass: 'hold'}" (longclick)="alert($event)"></button>`,
      {alert: window.alert}
    );
    host = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should not have "hold" css class', () => {
    expect(host.nativeElement.classList.contains('hold')).toBeFalsy();
  });

  it('should return false for preventDrag', () => {
    const directive = host.injector.get(LongClickDirective);
    expect(directive.preventDrag()).toBe(false);
  });

  describe('when button triggered mousedown', () => {
    beforeEach(() => {
      host.triggerEventHandler('mousedown', null);
    });

    it('should have "hold" css class', () => {
      expect(host.nativeElement.classList.contains('hold')).toBeTruthy();
    });

    describe('when button triggered mouseup', () => {
      beforeEach(fakeAsync(() => {
        tick(200);
        host.triggerEventHandler('mouseup', null);
      }));

      it('should not have "hold" css class', () => {
        expect(host.nativeElement.classList.contains('hold')).toBeFalsy();
      });

      it('should call alert', () => {
        expect(window.alert).toHaveBeenCalledWith({time: 200});
      });
    });
  });
});
