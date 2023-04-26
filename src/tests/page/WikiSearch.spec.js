import { expect ,test } from "@playwright/test";
import SearchResults from "../../page/Wiki/SearchResult.page";
import WikiMain from "../../page/Wiki/WikiMain.page";
import CONFIG from "../../utils/Config_Env"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test.describe('Verify search from Wiki @web',()=>{

    let context,page
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
    })
    test('Verify search with normal text', async() => {
        let searchWord = 'software testing'
        const wikiMain = new WikiMain(page)
        await wikiMain.openMainPage(CONFIG.MainPage_url)
        await wikiMain.clickToSearchPageContainText(searchWord)
        const searchPage = new SearchResults(page)
        await searchPage.verifySearchWithExactPageTitle(searchWord)
        //check if searchword present in title
        expect(await searchPage.isSearchWordPresentInTitle(searchWord)).toEqual(true)
    })

    test('Verify search with no result', async() => {
        let searchWord = 'asdasdasd'
        let length = 0
        const wikiMain = new WikiMain(page)
        await wikiMain.openMainPage(CONFIG.MainPage_url)
        await wikiMain.clickToSearchPageContainText(searchWord)
        const searchPage = new SearchResults(page)
        await searchPage.verifyNoSearchResult()
    })

})