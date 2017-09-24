import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';

const table = document.getElementsByClassName('article--events__table')[0];

const initDesktop = function() {
  Array.from(table.getElementsByClassName('events--desktop__row')).forEach((row, index) => {
    if(index == 0) {
      addHeader(row);
    } else {
      let td = document.createElement('td');
      row.appendChild(td);
      let link = row.querySelector('[data-event-id]');
      if(link) {
        let id = link.getAttribute('data-event-id');
        let containerElement = document.createElement('div');
        containerElement.setAttribute('event-id', id);
        td.setAttribute('class', 'events--event__column');
        td.appendChild(containerElement);
        app.renderComponent('race-ext', containerElement, null);
      }
    }
  });
};

const initMobile = function() {
  Array.from(table.getElementsByClassName('events--mobile__row')).forEach((row, index) => {
    if(index > 0) {
      let link = row.querySelector('[data-event-id]')
      if(link) {
        let id = link.getAttribute('data-event-id');
        let buttons = row.getElementsByClassName('events--mobile__link__buttons')[0];
        let containerElement = document.createElement('div');
        containerElement.setAttribute('event-id', id);
        buttons.appendChild(document.createElement('div').appendChild(containerElement));
        app.renderComponent('race-ext', containerElement, null);
      }
    }
  });
};

const initModal = function() {
  let modalElem = document.createElement('div');
  modalElem.setAttribute('class', 'race-ext-modal');
  document.body.appendChild(modalElem);
  app.renderComponent('entrants-modal', modalElem, null);
}

const addHeader = function(row) {
  const heading = document.createElement('th');
  const text = document.createTextNode('race lib');
  heading.appendChild(text);
  row.appendChild(heading);
}

const initApp = function() {
  let app = new App();

  setPropertyDidChange(() => {
    app.scheduleRerender();
  });

  app.registerInitializer({
    initialize(registry) {
      registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    }
  });
  return app;
};

const app = initApp();
initDesktop();
initMobile();
initModal();
app.boot();
app.scheduleRerender();
