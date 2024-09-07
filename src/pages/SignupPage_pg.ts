import {expect ,type Page, type Locator} from "@playwright/test"



export  class SignUp {

    readonly page: Page;
    readonly lnkHomePageWithColor :Locator;
    readonly lnkSignupORLogin : Locator;
    readonly h2NewUserSignUp :Locator;
    readonly txtusername: Locator;
    readonly txtusermailid: Locator;
    readonly txtpassword: Locator;
    readonly btnSignup: Locator;
    readonly rndMr: Locator;
    readonly rndMrs: Locator;
    readonly selectDay: Locator;
    readonly selectMonth: Locator;
    readonly selectYear: Locator;
    readonly chkSignup: Locator;
    readonly chkReceive: Locator;
    readonly txtFirstName: Locator;
    readonly txtLastName: Locator;
    readonly txtCompany: Locator;
    readonly txtAddres: Locator;
    readonly txtAddres2: Locator;
    readonly txtState: Locator;
    readonly txtCity: Locator;
    readonly txtZipcode: Locator;
    readonly txtMobileNumber: Locator;
    readonly btnCreateAccount: Locator;
    readonly lblAccountCreated:Locator;
    readonly btnContinue :Locator;
    readonly lnkLogout :Locator;



    constructor (page : Page){
        this.page = page;
        this.lnkHomePageWithColor = page.locator('a[style="color: orange;"] ',({hasText:' Home'}))
        this.lnkSignupORLogin = page.getByRole('link', { name: ' Signup / Login' });
        this.h2NewUserSignUp = page.getByRole('heading', { name: 'New User Signup!' })
        this.txtusername =page.getByPlaceholder('Name');
        this.txtusermailid = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.txtpassword = page.getByLabel('Password *');
        this.btnSignup = page.getByRole('button', { name: 'Signup' });
        this.rndMr = page.getByText('Mr.');
        this.rndMrs = page.getByText('Mrs.');
        this.selectDay = page.locator("#days");
        this.selectMonth = page.locator("#months");
        this.selectYear = page.locator("#years");
        this.chkSignup = page.getByLabel('Sign up for our newsletter!')
        this.chkReceive = page.getByLabel('Receive special offers from')
        this.txtFirstName = page.getByLabel('First name *')
        this.txtLastName = page.getByLabel('Last name *')
        this.txtCompany = page.getByLabel('Company', { exact: true })
        this.txtAddres = page.getByLabel('Address * (Street address, P.')
        this.txtAddres2= page.getByLabel('Address 2')
        this.txtState = page.getByLabel('State *')
        this.txtCity = page.getByLabel('City *')
        this.txtZipcode = page.locator('#zipcode')
        this.txtMobileNumber = page.getByLabel('Mobile Number *')
        this.btnCreateAccount = page.getByRole('button', { name: 'Create Account' });
        this.lblAccountCreated = page.getByText('Account Created!');
        this.btnContinue =page.getByRole('link', { name: 'Continue' });
        this.lnkLogout = page.getByRole('link', { name: ' Logout' });

    }
   
   async gotoSignIn(){
    await this.lnkSignupORLogin.click();
    await expect(this.h2NewUserSignUp).toBeVisible();
   }

  
}