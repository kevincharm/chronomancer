# chronomancer

Manipulates the global Date object; useful for tests.

## Installation

Get it via npm:
```sh
npm install --save chronomancer
```

## Usage

```js
import { freezeDate, resetDate } from 'chronomancer'

freezeDate('2017-01-31')        // Accepts whatever the Date() constructor can parse

const frozen = 1517356800000    // => 2018-01-31 in UNIX epoch time
assert(Date.now(), frozen)
assert(Date.now(), frozen)

resetDate()                     // Resets the global Date object
assert(Date.now(), frozen)      // This will throw AssertionError (unless you've figured out time travel)
```
