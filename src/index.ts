// tslint:disable-next-line
const _Date = Date

export interface ChronomancerOptions {
    preserveConstructor?: boolean
    preserveNow?: boolean
    preserveParse?: boolean
    preserveUTC?: boolean
}

export function freezeDate(epochMillisecondsOrDateString: string | number, options?: ChronomancerOptions): void
export function freezeDate(
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number,
    options?: ChronomancerOptions
): void
export function freezeDate(
    valueOrYear: string | number,
    monthOrOptions?: number | ChronomancerOptions,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number,
    opts?: ChronomancerOptions
) {
    if (typeof valueOrYear !== 'string' && typeof valueOrYear !== 'number') {
        return
    }

    resetDate()

    let quantum: Date
    let options: ChronomancerOptions
    if (!monthOrOptions && typeof monthOrOptions !== 'number') {
        quantum = new Date(valueOrYear as any)
        options = monthOrOptions || {}
    } else {
        quantum = new Date(valueOrYear as number, monthOrOptions as number, day, hours, minutes, seconds, milliseconds)
        options = opts || {}
    }

    if (!options.preserveConstructor) {
        function FakeDate() {
            return quantum
        }
        FakeDate.prototype = Date.prototype
        ;(Date as any) = FakeDate // tslint:disable-line
    }

    if (!options.preserveNow) {
        Date.now = function() {
            return quantum.valueOf()
        }
    }

    if (!options.preserveParse) {
        Date.parse = function() {
            return quantum.valueOf()
        }
    }

    if (!options.preserveUTC) {
        Date.UTC = function() {
            return quantum.valueOf()
        }
    }
}

export function resetDate() {
    ;(Date as any) = _Date
}
