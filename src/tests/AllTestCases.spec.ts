import {test ,expect} from "@playwright/test"
import { HomePage } from "../pages/HomePage_pg";
import {SignUp}  from "../pages/SignupPage_pg"
import {Login} from "../pages/LoginPage_pg"
import { ContactForm } from "../pages/ContactUSPage_pg";
import { AlltTestCases } from "../pages/TestCasePage_pg";
import { AllProducts } from "../pages/ProductPage_pg"
import { CartProcess } from "../pages/CartPage_pg";
import { waitForDebugger } from "inspector";
import { Checkout } from "../pages/CheckoutPage_pg";
import { checkPrime } from "crypto";


test.use({

    viewport: { width: 1600, height: 1200 },

});

test.beforeEach('Open Browser' , async({page}) => {
    const homePage = new HomePage(page);
    const signUp = new SignUp(page);
    await homePage.goto();
    await expect(homePage.lnkHomePageWithColor).toContainText(' Home');
   
})


test.skip('Test Case 1: Register User' , async({page}) => {

    const signUp = new SignUp(page);
    // await signUp.goto();
    // await expect(signUp.lnkHomePageWithColor).toContainText(' Home');
    // await signUp.lnkSignupORLogin.click();
    // await expect(signUp.h2NewUserSignUp).toBeVisible();
    await signUp.txtusername.fill('rama70');
    await signUp.txtusermailid.fill('nelapatla701@gmail.com');
    await signUp.btnSignup.click();
    await signUp.rndMr.waitFor();
    await signUp.rndMr.click()
    await signUp.txtpassword.fill('!Password1')
    await signUp.selectDay.selectOption('10');
    await signUp.selectMonth.selectOption('10');
    await signUp.selectYear.selectOption('1992');
    await signUp.chkSignup.check();
    await signUp.chkReceive.check();
    await signUp.txtFirstName.fill("Ramana M");
    await signUp.txtLastName.fill('Nelapatla');
    await signUp.txtCompany.fill('QA Experts Limited');
    await signUp.txtAddres.fill('2340 , txer ,fldsf');
    await signUp.txtAddres2.fill('chandapur srinarag jummu');
    await signUp.txtState.fill('Telagana');
    await signUp.txtCity.fill('Hyderabad');
    await signUp.txtZipcode.fill('500059');
    await signUp.txtMobileNumber.fill('2345689912');
    await signUp.btnCreateAccount.click();
    await signUp.lblAccountCreated.waitFor();
    await expect(signUp.lblAccountCreated).toBeVisible();
    await signUp.btnContinue.click();
    await signUp.lnkLogout.waitFor();
} )

test('Test Case 2: Login User with correct email and password',async({page}) => {

    const signUp = new SignUp(page);
    await signUp.gotoSignIn();
    const login = new Login(page);
    await login.txtEmailAddress.fill('nelapatla701@gmail.com');
    await login.txtPassword.fill('!Password1');
    await login.btnSignin.click();
})

test('Test Case 3: Login User with incorrect email and password' , async({page}) => {
    const signUp = new SignUp(page);
    await signUp.gotoSignIn();
    const login = new Login(page);
    await login.loginPageWithInvalidInputs('nelapatla70@gmail.com','!Password1');
  
})
test('Test Case 4: Logout User' , async({page}) => {
    const signUp = new SignUp(page);
    await signUp.gotoSignIn();
    const login = new Login(page);
    await login.loginPageWithValidInputs('nelapatla701@gmail.com','!Password1');
    await login.lnkLogout.click();

})
test('Test Case 5: Register User with existing email', async({page}) =>{
    const signUp = new SignUp(page);
    await signUp.gotoSignIn();
    await signUp.txtusername.fill('rama70');
    await signUp.txtusermailid.fill('nelapatla701@gmail.com');
    await signUp.btnSignup.click();
    await expect( page.getByText('Email Address already exist!')).toBeVisible
})

test('Test Case 6: Contact Us Form' ,async({page}) => {
    const  contactForm  = new ContactForm(page)
   await contactForm.lnkContactUs.click();
    await expect(contactForm.lblGetInTouch).toBeVisible();
    await contactForm.FillContactUs('Ramana','testhaven@haven.com','first commit information','')

})

test('Test Case 7: Verify Test Cases Page' , async({page}) =>{
    const testpage = new AlltTestCases(page);
    await testpage.lnkTestCases.click();
    await expect(testpage.lblTestCases).toBeVisible();

})

test('Test Case 8: Verify All Products and product detail page', async({page}) => {
    const homePage = new HomePage(page);
    await expect(homePage.lnkHomePageWithColor).toBeVisible();
    const allProducts = new AllProducts(page);
    await  allProducts.lnkProduct.click();
    await allProducts.lnkViewProduct.click();
    // Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await allProducts.validateProductsDetails('Blue Top','Category: Women > Tops','Rs. 500','Availability: In Stock','Condition: New','Brand: Polo');
    
})

test('Test Case 9: Search Product', async({page}) => {
    
    const allProducts = new AllProducts(page);
    await allProducts.lnkProduct.click();
    await allProducts.searchProduct('TOP');

})


test('Test Case 22: Add to cart from Recommended items', async({page}) => {
    const homePage = new HomePage(page);
    await expect(homePage.lnkHomePageWithColor).toBeTruthy();
    await homePage.lblSubscription.scrollIntoViewIfNeeded();
    await expect(homePage.lblRecomanded).toBeVisible();
    const product =new AllProducts(page);
    await product.addRecomandedProduct('Men Tshirt');
    await product.btnContinueShoping.click();
    const cartpage  = new CartProcess(page);
    await cartpage.lnkCart.click();
    await cartpage.verifyRecomandProduct('Men Tshirt')

})



test('Test Case 23: Verify address details in checkout page',async({page}) =>{
    //
})


 test('Test Case 24: Download Invoice after purchase order', async({page}) => {

    const homePage = new HomePage(page);
    await expect(homePage.lnkHomePageWithColor).toBeTruthy();
    const allProducts = new AllProducts(page);
    await allProducts.addProductToCard('Blue Top');
    const cartprocess = new CartProcess(page);
    await cartprocess.gotoCart();
   // click on signup page
    const signUp = new SignUp(page);
    await signUp.lnkSignupORLogin.click();

    // login page with 
    const login = new Login(page);
    await login.loginPageWithValidInputs('nelapatla701@gmail.com','!Password1');
    await cartprocess.lnkCart.click();
    await cartprocess.btnProcedChekcOut.click();

    // checkout process
    const checkout = new Checkout(page);
    await checkout.verifyAddress('Mr. Ramana M Nelapatla','QA Experts Limited','2340 , txer ,fldsf','chandapur srinarag jummu','Hyderabad Telagana 500059','India','2345689912');
    

 })





test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality' , async({page}) =>{
    // Arrow not showing 
})




test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality' , async({page}) => {
    const homePage  = new HomePage(page);
    await expect(homePage.lnkHomePageWithColor).toBeTruthy();
    await homePage.lblSubscription.scrollIntoViewIfNeeded();
    await homePage.lblPageTop.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await expect(homePage.lblHeaderValidate).toBeVisible();

})