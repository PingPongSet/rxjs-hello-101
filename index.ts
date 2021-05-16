import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';




function click() {
  fromEvent(document, 'click').subscribe(() => console.log('clicked'));
}
function scanTest() {
  fromEvent(document, 'click')
  .pipe(
    scan(count=> count+1, 0)
  )
  .subscribe(count=>console.log(count));
}
function mapTest() {
  fromEvent(document, 'click')
    .pipe(
      throttleTime(1000),
      map(event => event.clientX),
      scan((count, clientX) => count + clientX, 0)
    )
    .subscribe(count => console.log(count));
}