export default  {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy', 
    }
  };