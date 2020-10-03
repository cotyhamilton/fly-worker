# fly-worker

## Pass a function to a web worker

(or worker on the fly, or generic web worker)

### Installation

```
yarn add fly-worker
```

### Usage

Pass your function as the first argument and function parameters as additional arguments

```
import FlyWorker from 'fly-worker'

const add = (a, b) => (a + b);

const worker = new FlyWorker();

(async () => {
    console.log('3 + 9 = ', await worker.exec(add,3,9));
})();

```