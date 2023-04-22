import { expect } from "@playwright/test";
import Page from "../Page";


export default class WikiMain extends Page{
    constructor(page) {
        super(page)
    }
    
    searchForm = '//input[@placeholder="Search Wikipedia"]'
    searchForPagePanel = '//span[contains(text(),"Search for pages containing ")]'
    searchedWordInPanel = '.cdx-typeahead-search__search-footer__query'

    async openMainPage(url){
        await this.navigate(url)
    }

    async clickToSearchPageContainText(text){
        await this.page.click(this.searchForm)
        await this.page.fill(this.searchForm,text)
        await this.page.waitForSelector(this.searchForPagePanel)
        const searchWord = await this.page.locator(this.searchedWordInPanel).textContent()
        expect(searchWord).toEqual(text)
        await this.page.click(this.searchForPagePanel)
    }

}