import {expect,type Page,type Locator} from "@playwright/test";

export class Login{

    readonly page :Page;
    readonly lblLoginToYourAccount:Locator;
    readonly txtEmailAddress :Locator;
    readonly txtPassword:Locator;
    readonly btnSignin :Locator;
    readonly lblIncorrectCredtintial:Locator;
    readonly lnkLogoutWithColor : Locator;
    readonly lnkLogout :Locator;
    readonly test :Locator;

    constructor(page :Page){
        this.page = page;
        this.txtEmailAddress = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.txtPassword =page.getByPlaceholder('Password');
        this.btnSignin = page.getByRole('button', { name: 'Login' });
        this.lblIncorrectCredtintial =page.getByText('Your email or password is')
        this.lnkLogoutWithColor = page.locator('a[style="color: orange;"] ',({hasText:' Home'}))
        this.lnkLogout = page.getByRole('link', { name: ' Logout' });
        
    }

    async loginPageWithValidInputs(stremailid , strpassword ){
       // await this.lblLoginToYourAccount.waitFor();
        await this.txtEmailAddress.fill(stremailid);
        await this.txtPassword.fill(strpassword)
        await this.btnSignin.click();
    }

    async loginPageWithInvalidInputs(stremailid,strpassword) {
       //await this.lblLoginToYourAccount.waitFor({state:'visible'});
        await this.txtEmailAddress.fill(stremailid);
        await this.txtPassword.fill(strpassword)
        await this.btnSignin.click();
        await expect(this.lblIncorrectCredtintial).toBeVisible();
    }
    

}

 