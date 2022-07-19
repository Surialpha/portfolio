import { AfterViewInit, Component } from '@angular/core';
import {
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  throttleTime,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  typeAheadDebounce: Array<string> = [];
  typeAheadThrottle: Array<string> = [];
  typeAheadNative: Array<string> = [];
  searchBoxDebounce: any;
  searchBoxThrottle: any;
  numOfCallsDebounce = 0;
  numOfCallsThrottle = 0;
  numOfCallsNative = 0;

  ngAfterViewInit(): void {
    this.searchBoxDebounce = document.getElementById(
      'search-box-debounce'
    ) as HTMLInputElement;
    this.searchBoxThrottle = document.getElementById(
      'search-box-throttle'
    ) as HTMLInputElement;
    this.debounce();
    this.throttle();
  }

  debounce() {
    fromEvent(this.searchBoxDebounce, 'input')
      .pipe(
        map((e: any) => (e.target as HTMLInputElement).value),
        filter((text) => text.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.numOfCallsDebounce++;
        this.typeAheadDebounce.push(value);
      });
  }

  throttle() {
    fromEvent(this.searchBoxThrottle, 'input')
      .pipe(
        map((e: any) => (e.target as HTMLInputElement).value),
        filter((text) => text.length > 2),
        throttleTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.numOfCallsThrottle++;
        this.typeAheadThrottle.push(value);
      });
  }
  native(e: any) {
    this.numOfCallsNative++;
    this.typeAheadNative.push(e.target.value);
  }
}
