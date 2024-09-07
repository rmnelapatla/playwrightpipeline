import {expect,type Page, type Locator } from "@playwright/test"

export class Checkout{

    readonly page :Page;
    readonly lblheaderAddress:Locator;
    readonly lblYourAddress:Locator;
    readonly lblMrFirstNameLastName:Locator;
    readonly lblAddress1line:Locator;
    readonly lblAddress2line:Locator;
    readonly lbladdressCityStateNamePostcode:Locator;
    readonly lbladdressCountry:Locator;
    readonly lbladdressPhone:Locator;

    constructor(page:Page){
        this.page =page;
    }


    async verifyAddress(titlefnamelname ,address1,address2,address3,citystatepincode,country,mobileno){
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(0).locator('h3')).toHaveText('Your delivery address');
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(1)).toHaveText(titlefnamelname);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(2)).toHaveText(address1);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(3)).toHaveText(address2);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(4)).toHaveText(address3);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(5)).toHaveText(citystatepincode);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(6)).toHaveText(country);
        await expect(this.page.locator('ul#address_delivery').locator('li').nth(7)).toHaveText(mobileno);
        await expect(this.page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
        await this.page.locator('textarea[name="message"]').fill('15. Enter description in comment text area and click "Place Order"');
        await this.page.getByRole('link', { name: 'Place Order' }).click();

        await expect(this.page.locator('li').filter({ hasText: 'Payment' })).toBeVisible();
        await this.page.locator('input[name="name_on_card"]').fill('Ramana Murthy');
        await this.page.locator('input[name="card_number"]').fill('123423453456');
        await this.page.getByPlaceholder('ex.').fill('311');
        await this.page.getByPlaceholder('MM').fill('09');
        await this.page.getByPlaceholder('YYYY').fill('2025');
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
        await expect(this.page.getByText('Order Placed!')).toBeTruthy();
        await expect(this.page.getByText('Congratulations! Your order')).toBeTruthy();
        await this.page.getByRole('link', { name: 'Download Invoice' }).click();
        





    }
}