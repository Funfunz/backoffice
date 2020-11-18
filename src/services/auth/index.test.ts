import auth from './index'

test('auth service starts unauthenticated', () => {
  expect(auth.isAuthenticated).toBe(false)
});