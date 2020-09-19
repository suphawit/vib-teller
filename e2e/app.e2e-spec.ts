import { TellerApplicationPage } from './app.po';

describe('teller-application App', () => {
  let page: TellerApplicationPage;

  beforeEach(() => {
    page = new TellerApplicationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
