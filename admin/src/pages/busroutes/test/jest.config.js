module.exports = {
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
  };