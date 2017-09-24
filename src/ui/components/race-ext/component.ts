import Component, { tracked } from '@glimmer/component';
import { Event } from 'race-lib';
import $ from 'jquery';

$.load = function(htmlString: string) {
  const o = $($.parseHTML(htmlString));
  return function (selector) {
    return o.find(selector);
  }
}

Event.inject('fetch', window.fetch);
Event.inject('cheerio', $);

export default class RaceExt extends Component {

  @tracked eventId = '';
  event = null;

  didInsertElement() {
    this.eventId = this.element.parentElement.getAttribute('event-id');
    this.event = new Event(this.eventId);
    this.event.init();
  }

  viewEntrants() {
    window.postMessage({ event: this.event }, window.location.origin);
  }
}
