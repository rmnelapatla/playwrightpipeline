import {expect , type Page, type Locator} from "@playwright/test";


export class AllProducts{

    readonly page :Page;
    readonly lnkProduct :Locator;
    readonly lblAllProducts:Locator;
    readonly lnkViewProduct:Locator;
    readonly inputProductName:Locator;
    readonly btnSearch:Locator;
    readonly btnContinueShoping:Locator;
    
   
    
    constructor (page:Page){
        this.page = page;
        this.lnkProduct = page.getByRole('link', { name: ' Products' });
        this.lblAllProducts = page.getByRole('heading', { name: 'All Products' });
        this.lnkViewProduct = page.locator('[href="/product_details/1"]');
        this.inputProductName = page.getByPlaceholder('Search Product');
        this.btnSearch = page.getByRole('button', { name: '' })
        this.btnContinueShoping =page.getByRole('button', { name: 'Continue Shopping' });
       

    }
     // Verify that detail detail is visible: product name, category, price, availability, condition, brand

    async validateProductsDetails(productname,category,price,availability,condition,brand){
        await expect( this.page.locator('div.product-information').locator('h2')).toHaveText(productname);
        await expect(this.page.locator('div.product-information').locator('p').nth(0)).toHaveText(category);
        await expect(this.page.locator('div.product-information').locator('span').locator('span')).toHaveText(price);
        await expect( this.page.locator('div.product-information').locator('p').nth(1)).toHaveText(availability);
        await expect( this.page.locator('div.product-information').locator('p').nth(2)).toHaveText(condition);
        await expect( this.page.locator('div.product-information').locator('p').nth(3)).toHaveText(brand);
    }


    async searchProduct(productname){
        await  this.inputProductName.fill(productname);
        await this.btnSearch.click();
        // await expect (this.page.locator('div.features_items').locator('p')).toContainText('Top');
        console.log( await this.page.locator('div.features_items').locator('p').filter({hasNotText:'Top'}).count())

    
        for (let index = 0; index < 6; index++) {
            
            console.log(await this.page.locator('div.single-products ')
            .nth(index).locator('p').allTextContents());
            const pinfo= await this.page.locator('div.single-products ')
            .nth(index).locator('p').allTextContents();
            console.log(pinfo[0]);
         
            await expect(pinfo[0]).toMatch('Top')
        }

    }

    async addProductToCard(productname){
        await this.page.locator('div.features_items').locator('p',({hasText:productname})).locator('..').locator('a').first().click();
        await this.btnContinueShoping.click();
    }

    async addRecomandedProduct(productname){
        await this.page.locator('div.recommended_items').locator('p',({hasText:productname})).locator('..').locator('a').first().click();
    }
}

