
describe('This is the test suite, hellooooo', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect((1 + 2)).toBe(3);
  });

  test('Uh oh, failing test', () => {
    expect(false).toBe(true);
  })
})
