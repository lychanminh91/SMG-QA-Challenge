for installation:
* npm install
* npm i -D @playwright/test
* npx playwright install

to run api tests:
* ENV=STG npm run wiki_api

to run web tests:
* ENV=STG npm run wiki_web

to Generate allure report and open it:
* allure generate ./allure-results --clean && allure open ./allure-report

