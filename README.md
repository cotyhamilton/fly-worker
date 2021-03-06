# fly-worker

[![npm version](https://img.shields.io/npm/v/fly-worker.svg)](https://www.npmjs.org/package/fly-worker)
[![npm version](https://img.shields.io/npm/dt/fly-worker.svg)](https://www.npmjs.org/package/fly-worker)

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

Live example here
https://cotyhamilton.github.io/fly-worker/example/