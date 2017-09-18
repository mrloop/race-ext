import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';

const table = document.getElementsByClassName('article--events__table')[0];

const initDesktop = function() {
  Array.from(table.getElementsByClassName('events--desktop__row')).forEach((row, index) => {
    if(index == 0) {
      addHeader(row);
    } else {
      let containerElement = document.createElement('div');
      row.appendChild(document.createElement('td').appendChild(containerElement));
      initApp(containerElement);
    }
  });
};

const initMobile = function() {
  Array.from(table.getElementsByClassName('events--mobile__row')).forEach((row, index) => {
    if(index > 0) {
      let buttons = row.getElementsByClassName('events--mobile__link__buttons')[0];
      let containerElement = document.createElement('div');
      buttons.appendChild(document.createElement('div').appendChild(containerElement));
      initApp(containerElement);
    }
  });
};

const addHeader = function(row) {
  const heading = document.createElement('th');
  const text = document.createTextNode('race lib');
  heading.appendChild(text);
  row.appendChild(heading);
}

const initApp = function(containerElement) {
  let app = new App();

  setPropertyDidChange(() => {
    app.scheduleRerender();
  });

  app.registerInitializer({
    initialize(registry) {
      registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    }
  });

  app.renderComponent('race-ext', containerElement, null);

  app.boot();
}

initDesktop();
initMobile();


