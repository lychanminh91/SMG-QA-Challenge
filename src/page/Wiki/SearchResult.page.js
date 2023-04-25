import { expect } from "@playwright/test";
import Page from "../Page";

export default class SearchResults extends Page{
    constructor(page){
        super(page)
    }

    noResultMsg = "//p[contains(text(),'There were no results matching the query.')]"
    searchMatchesInFirstResult = "//div[@class='mw-search-result-heading']/a[@data-serp-pos='0']/span"

    async verifySearchWithExactPageTitle(text){
        const title = await this.page.locator(`//div[@class='mw-search-result-heading']/a[@title='${text}']`)
        expect(title).toBeVisible
    }

    async verifyNoSearchResult(){
        expect(await this.page.locator(this.noResultMsg)).toBeVisible
    }

    async isSearchWordPresentInTitle(searchword){
        let listMatch = []
        let isPresent = false
        await this.page.waitForSelector(this.searchMatchesInFirstResult)
        const allElements = await this.page.$$(this.searchMatchesInFirstResult)
        for (let i=1 ; i<= allElements.length;i++){
            listMatch.push(await this.page.locator(`${this.searchMatchesInFirstResult}[${i}]`).textContent())
        }

        for (let i=0 ; i<= listMatch.length;i++){
            if (searchword.includes(listMatch[i]))
            {
                isPresent = true
            }
        }
        
        return isPresent
    }
}
