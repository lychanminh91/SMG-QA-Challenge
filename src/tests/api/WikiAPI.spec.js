import { test } from "@playwright/test";
import WikiAPIHelper from '../../api/helper/WikiAPI.helper'
import data from "../../resource/data/searchParam.json"

test.describe('Verify API call @wiki', () =>{
    

    for ( let i = 0 ; i < data.length; i++){
        test(`Verify API call for ${data[i].action} action and search for ${data[i].srsearch}`, async({page}) => {
            const apiHelper = new WikiAPIHelper(page)
            await apiHelper.wikiAPICall(data[i])
        })
    }
})