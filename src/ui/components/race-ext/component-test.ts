import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';
import { Event } from 'race-lib';
import { injectFixtures } from 'race-fix';

injectFixtures(Event);

const { module, test } = QUnit;

const didRender = function (app: any): Promise<void> {
  return new Promise<void>(resolve => {
    let watcher = setInterval(function() {
      if (app['_rendering']) return;
      clearInterval(watcher);
      resolve();
    }, 10);
  });
};

module('Component: race-ext', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<div event-id="123"><race-ext /></div>`);
    this.app.scheduleRerender();
    await didRender(this.app);
    assert.equal(this.containerElement.textContent.trim(), 'Entrants');
    assert.equal(this.containerElement.querySelector('a').getAttribute('data-test-event-id'), '123');
  });
});
