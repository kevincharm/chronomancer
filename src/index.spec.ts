import * as test from 'tape'
import { freezeDate, resetDate } from './index'

test('Freezes new Date()', t => {
    t.plan(3)

    freezeDate('2018-03-08T12:00:00Z')
    let frozen = new Date()
    t.equal(frozen.valueOf(), 1520510400000, 'from ISO string')

    freezeDate(2017, 1, 14, 12, 0, 0, 0)
    frozen = new Date()
    t.equal(frozen.valueOf(), 1487044800000, 'from yyyy/mm/dd/hh/min/s/ms')

    freezeDate(1520516198308)
    frozen = new Date()
    t.equal(frozen.toISOString(), '2018-03-08T13:36:38.308Z', 'from ms since Epoch')

    resetDate()
})

test('Freezes Date.now()', t => {
    t.plan(3)

    freezeDate('2018-03-08T12:00:00Z')
    let frozen = Date.now()
    t.equal(frozen, 1520510400000, 'from ISO string')

    freezeDate(2017, 1, 14, 12, 0, 0, 0)
    frozen = Date.now()
    t.equal(frozen, 1487044800000, 'from yyyy/mm/dd/hh/min/s/ms')

    freezeDate(1520516198308)
    frozen = Date.now()
    t.equal(frozen, 1520516198308, 'from ms since Epoch')

    resetDate()
})

test('Freezes Date.parse()', t => {
    t.plan(3)

    freezeDate('2018-03-08T12:00:00Z')
    let frozen = Date.parse('Fred Fredburger')
    t.equal(frozen, 1520510400000, 'from ISO string')

    freezeDate(2017, 1, 14, 12, 0, 0, 0)
    frozen = Date.parse('1990-02-14')
    t.equal(frozen, 1487044800000, 'from yyyy/mm/dd/hh/min/s/ms')

    freezeDate(1520516198308)
    frozen = Date.parse('2017-01-01')
    t.equal(frozen, 1520516198308, 'from ms since Epoch')

    resetDate()
})

test('Freezes Date.UTC()', t => {
    t.plan(3)

    freezeDate('2018-03-08T12:00:00Z')
    let frozen = Date.UTC(2017, 2)
    t.equal(frozen, 1520510400000, 'from ISO string')

    freezeDate(2017, 1, 14, 12, 0, 0, 0)
    frozen = Date.UTC(1990, 2, 14, 12, 15, 2, 0)
    t.equal(frozen, 1487044800000, 'from yyyy/mm/dd/hh/min/s/ms')

    freezeDate(1520516198308)
    frozen = Date.UTC(2013, 5, 22)
    t.equal(frozen, 1520516198308, 'from ms since Epoch')

    resetDate()
})

test('Fools date-fns', t => {
    t.plan(1)

    freezeDate('2018-03-08T12:00:00Z')
    const frozen = new Date()
    t.equal(frozen instanceof Date, true, 'instanceof Date check')

    resetDate()
})

test('Restores original Date object', t => {
    t.plan(2)

    freezeDate('2018-03-08T12:00:00Z')
    let frozen = new Date()
    t.equal(frozen.valueOf(), 1520510400000, 'freezes date')

    resetDate()
    frozen = new Date()
    t.notEqual(frozen.valueOf(), 1520510400000, 'restores date')
})
