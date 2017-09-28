import Component, { tracked } from '@glimmer/component';
import { Event } from 'race-lib';

export default class EntrantsModal extends Component {

  @tracked className:string = "race-ext-modal--hide";
  @tracked event = null;
  events = {};
  receivedMessageBind = null;

  receivedMessage(msg) {
    if(msg.data.eventId && msg.origin === window.location.origin) {
      const cachedEvent = this.events[msg.data.eventId];
      if(!cachedEvent || cachedEvent.id !== msg.data.eventId) {
        new Event(msg.data.eventId).init().then((evt) => {
          this.event = evt;
          this.events[msg.data.eventId] = evt;
          this.className = "race-ext-modal--show";
        });
      } else if(cachedEvent) {
        this.event = cachedEvent;
        this.className = "race-ext-modal--show";
      }
    }
  }

  didInsertElement() {
    this.receivedMessageBind = this.receivedMessage.bind(this);
    window.addEventListener('message', this.receivedMessageBind);
  }

  willDestroy() {
    window.removeEventListener('message', this.receivedMessageBind);
  }

  close() {
    this.event = null;
    this.className = "race-ext-modal--hide";
  }
};
