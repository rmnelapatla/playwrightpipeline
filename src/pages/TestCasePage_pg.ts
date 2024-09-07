import {expect,type Page, type Locator}  from "@playwright/test"



export class AlltTestCases{
    readonly page :Page;
    readonly lnkTestCases :Locator;
    readonly lblTestCases :Locator;

    constructor(page:Page){
        this.page =page;
        this.lnkTestCases = page.getByRole('link', { name: 'Test Cases', exact: true });
        this.lblTestCases =page.locator('b');
    }
}