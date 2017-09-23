import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

const process = { env: { test: true } };

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
    assert.equal(this.containerElement.textContent.trim(), 'EventId: 123');
  });
});
