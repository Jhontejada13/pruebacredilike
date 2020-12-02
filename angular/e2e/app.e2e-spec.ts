import { PeliFlixTemplatePage } from './app.po';

describe('PeliFlix App', function() {
  let page: PeliFlixTemplatePage;

  beforeEach(() => {
    page = new PeliFlixTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
