const BASE_URL = `http://localhost:${process.env.PORT || 8080}`;

describe('homePage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have logo text', async () => {
    await page.goto(BASE_URL);
    await page.waitForSelector('h1', {
      timeout: 5000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    expect(text).toContain('Umi Dva Antd Mobile');
  });
});
