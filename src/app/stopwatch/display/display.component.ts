import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { buffer, debounceTime, filter, map } from 'rxjs/operators';
import { StopWatchDisplay } from '../stop-watch-display';
import { TimeService } from '../time.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
})
export class DisplayComponent {
  stopwatch: StopWatchDisplay = {
    seconds: '00',
    minutes: '00',
    hours: '00',
  };

  constructor(private timerService: TimeService) {}

  startStop(): void {
    this.timerService.startStop(this.stopwatch);
  }

  reset(): void {
    this.stopwatch = this.timerService.resetTimer();
  }

  wait(): void {
    const mouse$ = fromEvent(document, 'click');

    const buff$ = mouse$.pipe(debounceTime(299));

    const click$ = mouse$.pipe(
      buffer(buff$),
      map((list) => {
        return list.length;
      }),
      filter((x) => x === 2)
    );

    click$.subscribe(() => {
      this.timerService.pauseTimer();
    });
  }
}
