import { tempKelvinToCelsius, getHrMinTimeStamp, getDayMonthStamp, capitaliseFirstLetter, windDirection } from './utils.js';

describe('tempKelvinToCelsius', () => {
    describe('when given temperature in kelvin', () => {
        it('should successfully convert to Celsius', () => {
            expect(tempKelvinToCelsius(273.15)).toBe(0);
            expect(tempKelvinToCelsius(373.15)).toBe(100);
            expect(tempKelvinToCelsius(0)).toBe(-273);
        });
    });
});

describe('getHrMinTimeStamp', () => {
    describe('when given unix timestamp', () => {
        it('should convert winter UTC time to Europe/London local time', () => {
            expect(getHrMinTimeStamp(1672576200, 'en-GB', 'Europe/London')).toBe('12:30');
        });

        it('should convert summer UTC time to UTC time', () => {
            expect(getHrMinTimeStamp(1680352200, 'en-GB', 'UTC')).toBe('12:30');
        });

        it('should pad single digit hours and minutes', () => {
            expect(getHrMinTimeStamp(1672549380, 'en-GB', 'UTC')).toBe('05:03');
        });
    });
});

describe('getDayMonthStamp', () => {
    describe('when given unix timestamp', () => {
        it('should convert to the correct day and month', () => {
            expect(getDayMonthStamp(1672531200, 'en-GB', 'Europe/London')).toBe('Sunday, 1 January');
        });

        it('should handle different months and days', () => {
            expect(getDayMonthStamp(1689379200, 'en-GB', 'Europe/London')).toBe('Saturday, 15 July');
        });
    });
});

describe('capitaliseFirstLetter', () => {
    describe('when given a phrase', () => {
        it('should capitalise the first letter', () => {
            expect(capitaliseFirstLetter('hello')).toBe('Hello');
            expect(capitaliseFirstLetter('world')).toBe('World');
        });

        it('should leave the rest of the string unchanged', () => {
            expect(capitaliseFirstLetter('hello world')).toBe('Hello world');
            expect(capitaliseFirstLetter('a')).toBe('A');
        });

        it('should handle empty string', () => {
            expect(capitaliseFirstLetter('')).toBe('');
        });
    });
});

describe('windDirection', () => {
    describe('when given degrees', () => {
        it('should return correct direction for North', () => {
            expect(windDirection(0)).toBe('N');
            expect(windDirection(11.24)).toBe('N');
            expect(windDirection(348.76)).toBe('N');
        });

        it('should return correct direction for Northeast', () => {
            expect(windDirection(22.5)).toBe('NE');
            expect(windDirection(45)).toBe('NE');
            expect(windDirection(67.49)).toBe('NE');
        });

        it('should return correct direction for East', () => {
            expect(windDirection(67.5)).toBe('E');
            expect(windDirection(90)).toBe('E');
            expect(windDirection(112.49)).toBe('E');
        });

        it('should return correct direction for Southeast', () => {
            expect(windDirection(112.5)).toBe('SE');
            expect(windDirection(135)).toBe('SE');
            expect(windDirection(157.49)).toBe('SE');
        });

        it('should return correct direction for South', () => {
            expect(windDirection(157.5)).toBe('S');
            expect(windDirection(180)).toBe('S');
            expect(windDirection(202.49)).toBe('S');
        });

        it('should return correct direction for Southwest', () => {
            expect(windDirection(202.5)).toBe('SW');
            expect(windDirection(225)).toBe('SW');
            expect(windDirection(247.49)).toBe('SW');
        });

        it('should return correct direction for West', () => {
            expect(windDirection(247.5)).toBe('W');
            expect(windDirection(270)).toBe('W');
            expect(windDirection(292.49)).toBe('W');
        });

        it('should return correct direction for Northwest', () => {
            expect(windDirection(292.5)).toBe('NW');
            expect(windDirection(315)).toBe('NW');
            expect(windDirection(337.49)).toBe('NW');
        });
    });
});