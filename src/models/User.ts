import { VIEW_PORTS } from '../@types/VIEW_PORTS';
import puppeteer from '../services/puppeteer';

export class User {
  public name: string = '';

  public email: string = '';

  public OS: string = '';

  public browser: string = '';

  public language: string = '';

  public viewport: keyof typeof VIEW_PORTS = 'WEB';

  constructor(props: User) {
    Object.assign(this, props);
  }

  public async start() {
    puppeteer.launch({
        headless: true,
        userDataDir: `./tmp/${this.email}`,
        args: ['--no-sandbox'],
        defaultViewport: VIEW_PORTS[this.viewport],
      }).then(async browser => {
      console.log('Running tests..');

      const page = await browser.newPage();
      await page.setJavaScriptEnabled(true);
      await page.goto('https://antoinevastel.com/bots/datadome');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'testresult.png', fullPage: true });
      
      console.log(`All done, check the screenshot. ✨`);
      
      await browser.close();
    });
  }
}
