import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  readonly unsubscriber: Subject<void> = new Subject<void>();

  public blockBackNavigation() {
    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(takeUntil(this.unsubscriber)).subscribe((_) => {
      history.pushState(null, '');
      console.log('You cant go back!');
    });
  }

}
