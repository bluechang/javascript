// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: ['html', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/**/__tests__/**/*spec.[jt]s?(x)']
}
