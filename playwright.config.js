const config = {
  testDir: "src/tests",
  workers : 2,
  timeout: 6000 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  reporter: [
    ["line"],
    ["allure-playwright", { detail: true, outputFolder: "allure-results" }],
  ]
};
module.exports = config;
