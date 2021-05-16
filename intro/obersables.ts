import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';
//https://rxjs.dev/guide/Observable

//Observables are able to deliver values either synchronously or asynchronously.
function multiValues() {
  const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log('just before subscribe');
  observable.subscribe({
    next(x) {
      console.log('got value ' + x);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    }
  });
  console.log('just after subscribe');

  // just before subscribe
  // got value 1
  // got value 2
  // got value 3
  // just after subscribe
  // got value 4
  // done
}
