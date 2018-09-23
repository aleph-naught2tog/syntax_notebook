import * as React from 'react';

interface SomeInterface {
    element: React.ReactElement<HTMLInputElement>;
}

describe('ts works', () => {
    test('ts truth is true', () => {
        const variable: string = "apple";
        console.log(<div>{variable}</div>);
        expect(true).toBe(true);
    });
});