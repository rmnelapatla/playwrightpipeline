import {expect,type Page,type Locator} from "@playwright/test";
import { TIMEOUT } from "dns";
import path from "path";


export class ContactForm{

     readonly page :Page;
     readonly lnkContactUs:Locator;
    readonly lblGetInTouch :Locator;
    readonly txtName:Locator;
    readonly txtEmail:Locator;
    readonly txtSubject:Locator;
    readonly txtMessage:Locator;
    readonly btnUploadFile:Locator;
    readonly btnSubmit:Locator;
    readonly lblSucess:Locator;
    readonly btnHome:Locator;

    constructor(page :Page){
        this.page = page;     
        this.lnkContactUs  = page.locator('li').filter({ hasText: 'Contact us' });
        this.lblGetInTouch = page.getByRole('heading', { name: 'Contact Us' })
        this.txtName = page.getByPlaceholder('Name');
        this.txtEmail = page.getByPlaceholder('Email', { exact: true });
        this.txtSubject = page.getByPlaceholder('Subject');
        this.txtMessage = page.getByPlaceholder('Your Message Here');
        this.btnUploadFile = page.locator('input[name="upload_file"]');
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.lblSucess = page.locator('#contact-page').getByText('Success! Your details have');
        this.btnHome =page.getByRole('link', { name: ' Home' });


   }

   async FillContactUs(inputName,inputEmail,inputMessage, strFilePath){
        await this.lnkContactUs.click();
        await expect(this.lblGetInTouch).toBeVisible();
        await this.txtName.fill(inputName);
        await this.txtEmail.fill(inputEmail);
        await this.txtMessage.fill(inputMessage);
        //wait for event for file upload
        const fileupload = this.page.waitForEvent('filechooser')   
        await this.btnUploadFile.click();
        const fileChooser = await fileupload;
        await fileChooser.setFiles(path.join('E:\\AutomationTestCases\\FilesToUpload\\', 'linux.pem'));
        await this.btnSubmit.click();  
        // Alerts
        this.page.waitForTimeout(1000);
        this.page.on('dialog',dialog => dialog.accept);
        await expect(this.lblSucess).toBeVisible();
        await this.btnHome.click();

   }
}