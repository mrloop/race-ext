import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: race-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    //can't pass object to @race :( in test
    await this.render(hbs`<race-detail @race='empty' />`);
    assert.ok(this.containerElement.innerText.includes('No Entrants'));
  });
});
