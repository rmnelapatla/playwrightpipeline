import { expect , type Page,type Locator } from "@playwright/test";

export class HomePage{

    readonly page :Page;
    readonly lnkHomePageWithColor :Locator;
    readonly lbl1:Locator;
    readonly lblSubscription:Locator;
    readonly lblPageTop:Locator;
    readonly lblHeaderValidate: Locator;
    readonly lblRecomanded:Locator;

    constructor(page :Page){
        this.page =page;
        this.lnkHomePageWithColor = page.locator('a[style="color: orange;"] ',({hasText:' Home'}))
        this.lblSubscription= page.locator('h2',({hasText:'Subscription'}))
        this.lblPageTop = page.getByAltText('Website for automation practice');
        this.lblHeaderValidate = page.getByRole('heading', { name: 'Full-Fledged practice website' });
        this.lblRecomanded = page.getByRole('heading', { name: 'recommended items' });



       
     

    }

    async goto(){
        await this.page.goto('http://automationexercise.com', ({waitUntil:"load"}));
        await this.page.once('load', () => console.log('Page loaded!'));
        await expect(this.lnkHomePageWithColor).toBeVisible();
        const ss =await this.lnkHomePageWithColor.getAttribute('visible') ? "Home visiable": "Home element not visiable";
        console.log(ss);


    }

}


