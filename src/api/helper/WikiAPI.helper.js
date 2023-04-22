import { expect } from "@playwright/test";
import axios from "axios";
import CONFIG from "../../utils/Config_Env.js";

export default class WikiAPIHelper{

    constructor(page){
        this.page = page
        this.apiClient = axios.create({
            baseURL : CONFIG.Base_url,
            headers : {'content-type': 'application/json', 'accept': 'application/json'}
        })

        this.apiClient.interceptors.response.use(
            (res) =>{
                return res
            },
            (err) => {
                console.log(this.errorResponse(err))
                return Promise.reject(err)
            }
        )

        this.apiClient.interceptors.request.use(
            (req) => {
                return req
            },
            (err) => {
                console.log(this.errorResponse(err))
                return Promise.reject(err)
            }
        )
    }

    errorResponse({response}){
        return {
            status: response?.status,
            statusText: response?.statusText,
            url: response?.config.url,
            method: response?.config.method,
            data: response?.config?.data,
            errors: response?.data?.errors,
            message: response?.data,
        }
    }

    
    async wikiAPICall(rowItem){    
        let paramString = `?action=${rowItem.action}&format=${rowItem.format}&list=${rowItem.list}&formatversion=${rowItem.formatversion}&srsearch=${rowItem.srsearch}&sroffset=${rowItem.sroffset}` 
        const {status,data} = await this.apiClient.get(paramString)
        if (typeof rowItem.action !='string' || rowItem.format !='json' || typeof rowItem.list != 'string' || typeof rowItem.formatversion !='number' || typeof rowItem.sroffset != 'number')
        {
            expect(data.error.code,'error input').toContain('bad')
            expect(status).toEqual(200)
        }
        else {
            expect(data.batchcomplete,'Get api success').toEqual(true)
            expect(status).toEqual(200)
            await this.verifyAPIResponseByAction(rowItem.action,data,rowItem.srsearch)
        }}
    
    async verifyAPIResponseByAction(actionType,data,verifyItem){
        if (actionType == 'query'){
            let searchResults = data.query.search
                for ( let i = 0 ;i < searchResults.length ; i++){
                    if(searchResults[i].title.includes(verifyItem))
                    {
                        break
                    }             
                }
            return console.log(`${verifyItem} is found in API response`)
        }
    }

}

