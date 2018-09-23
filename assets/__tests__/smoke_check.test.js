describe('js jest works', () => {
  test('truth is true', () => {
    expect(true).toBe(true);
  });

  test('can handle spread', () => {
    const obj = {apple: 12};
    const otherObj = {...obj};
    expect(otherObj.apple).toBe(obj.apple);
  });
});
