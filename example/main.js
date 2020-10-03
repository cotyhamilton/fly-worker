import FlyWorker from '../lib/index.js'

const worker = new FlyWorker();

document.getElementById('blocking').onclick = function () { blocking() };
document.getElementById('non-blocking').onclick = function () { nonBlocking() };

const random = document.getElementById('random');
const primesFrom = document.getElementById('from');
const primesTo = document.getElementById('to');
const result = document.getElementById('result');

function blocking() {
    result.innerHTML = '';
    const primes = findPrimes(primesFrom.value, primesTo.value);
    result.innerHTML = primes;
}

async function nonBlocking() {
    result.innerHTML = '';
    const primes = await worker.exec(findPrimes, primesFrom.value, primesTo.value);
    result.innerHTML = primes;
}

function findPrimes(fromNumber, toNumber) {
    var list = [];
    for (var i = fromNumber; i <= toNumber; i++) {
        if (i > 1) list.push(i);
    }

    var maxDiv = Math.round(Math.sqrt(toNumber));
    var primes = [];

    for (var i = 0; i < list.length; i++) {
        var failed = false;
        for (var j = 2; j <= maxDiv; j++) {
            if ((list[i] != j) && (list[i] % j == 0)) {
                failed = true;
            } else if ((j == maxDiv) && (failed == false)) {
                primes.push(list[i]);
            }
        }
    }

    return primes;
}

function randomString() {
    random.innerHTML  = Math.random().toString(36).substr(2)
}

setInterval(randomString, 500);