import { expect } from "@playwright/test";
import Page from "../Page";

export default class SearchResults extends Page{
    constructor(page){
        super(page)
    }

    noResultMsg = "//p[contains(text(),'There were no results matching the query.')]"

    async verifySearchWithExactPageTitle(text){
        const title = await this.page.locator(`//div[@class='mw-search-result-heading']/a[@title='${text}']`)
        expect(title).toBeVisible
    }

    async verifyNoSearchResult(){
        expect(await this.page.locator(this.noResultMsg)).toBeVisible
    }
}
