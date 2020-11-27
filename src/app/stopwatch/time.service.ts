import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StopWatchDisplay } from './stop-watch-display';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  #timer$ = interval(1000);
  #seconds = 1;
  #minutes = 0;
  #hours = 0;
  #paused = false;
  #timerSubscription: Subscription = null;

  startStop(stopwatch: StopWatchDisplay): StopWatchDisplay {
    if (this.#timerSubscription && !this.#paused) {
      this.resetEverything(stopwatch);
      return;
    }

    this.#paused = false;
    this.#timerSubscription = this.#timer$.subscribe(() => {
      if (this.#paused) {
        this.#timerSubscription.unsubscribe();
        return;
      } else {
        stopwatch.seconds = this.getNumberPadded(this.#seconds);
        stopwatch.minutes = this.getNumberPadded(this.#minutes);
        stopwatch.hours = this.getNumberPadded(this.#hours);

        if (this.#seconds === 59) {
          this.#minutes++;
          if (this.#minutes > 59) {
            this.#minutes = 0;
            this.#hours++;
          }
        }

        this.#seconds++;

        if (this.#seconds > 59) {
          this.#seconds = 0;
        }
      }
    });
  }

  pauseTimer(): void {
    this.#paused = !this.#paused;
  }

  resetTimer(): StopWatchDisplay {
    const stopWatch = {
      seconds: '00',
      minutes: '00',
      hours: '00',
    };
    if (this.#timerSubscription) {
      this.resetEverything(stopWatch);
      this.#paused = false;
      this.startStop(stopWatch);
    }

    return stopWatch;
  }

  private resetEverything(stopwatch: StopWatchDisplay): void {
    this.#timerSubscription.unsubscribe();
    this.#timerSubscription = null;

    this.#paused = true;
    this.#seconds = 0;
    this.#minutes = 0;
    this.#hours = 0;
    stopwatch.seconds = '00';
    stopwatch.minutes = '00';
    stopwatch.hours = '00';
  }

  private getNumberPadded(val: number): string {
    return `${val < 10 ? '0' + val : val}`;
  }
}
