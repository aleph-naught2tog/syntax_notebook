import * as React from 'react';

describe('jsx jest works', () => {
  test('truth is true', () => {
    expect(true).toBe(true);
  });

  test('can handle jsx', () => {
    console.log(<div>orange</div>);
    expect(true).toBe(true);
  });
});
