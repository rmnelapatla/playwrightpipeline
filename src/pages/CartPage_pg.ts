import {expect , type Page, type Locator} from "@playwright/test"

export class CartProcess {
    readonly page:Page;
    readonly lnkCart:Locator;
    readonly lblBreadCrumbShopingCart :Locator;
    readonly btnProcedChekcOut:Locator;
    readonly btnContinueOnCart:Locator;
    constructor(page :Page){
        this.page = page;
        this.lnkCart = page.getByRole('link', { name: ' Cart' });
        this.lblBreadCrumbShopingCart = page.getByText('Shopping Cart');
        this.btnProcedChekcOut =page.getByText('Proceed To Checkout');
        this.btnContinueOnCart =page.getByRole('button', { name: 'Continue On Cart' });


    }

    async gotoCart(){
        await this.lnkCart.waitFor();
        await expect(this.lnkCart).toBeVisible();
        await this.lnkCart.click();
        await expect(this.lblBreadCrumbShopingCart).toBeVisible();
        await this.btnProcedChekcOut.click();
        await this.page.waitForTimeout(2000);
        await this.btnContinueOnCart.click();
        
    }

    async verifyRecomandProduct(productname){
        await expect(this.page.getByRole('link', { name: productname })).toBeVisible();
    }
}
