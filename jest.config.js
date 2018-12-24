module.exports = {
  moduleFileExtensions: ["js", "ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/utils/"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).ts?(x)'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
