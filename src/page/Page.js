class Page {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url, { timeout: 120000 });
  }

  async getDocumentHeight() {
    return await this.page.evaluate(() => {
      return document.body.scrollHeight;
    });
  }

  async scrollWithHeight() {
    await this.page.evaluate(() => {
      return window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollToLoadAllPage() {
    let index = 0;
    while (index === 0) {
      const heightBeforeScroll = await this.getDocumentHeight();
      await this.scrollWithHeight();
      await this.page.waitForTimeout(1000);
      const heightAfterScroll = await this.getDocumentHeight();
      if (heightBeforeScroll === heightAfterScroll) {
        return index++;
      }
    }
    await this.page.waitForLoadState();
  }

  async getLengthOfLocators(locatorsByIndex, expectedLength) {
    let locatorsLength
    for (let i = 1; i <= expectedLength; i++) {
      await this.page.waitForSelector(`${locatorsByIndex}[${i}]`, { timeout: 10000 })
      locatorsLength = i
    }
    return locatorsLength
  }
}

export default Page;
