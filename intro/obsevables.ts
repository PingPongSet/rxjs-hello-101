import { fromEvent } from 'rxjs';
import { from, Observable } from 'rxjs/dist/types';
import { throttleTime, map, scan } from 'rxjs/operators';
//https://rxjs.dev/guide/Observable

 console.log('done');
unsubscribe();
 console.log('done');

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

//It is a good idea to wrap any code in subscribe with try/catch block that will deliver an Error notification if it catches an exception:
function errorTest() {
  const observable = new Observable(function subscribe(subscriber) {
    try {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
      subscriber.next(4); //never runs
    } catch (err) {
      subscriber.error(err); // delivers an error if it caught one
    }
  });
}

function unsubscribe() {
  const observable = from([10, 20, 30]);
  const subscription = observable.subscribe(x => console.log(x));
  // Later:
  subscription.unsubscribe();
}
