import Component from '@glimmer/component';

export default class EntrantsModal extends Component {

  event = null;

  receivedMessage(msg) {
    if(msg.data.event && msg.origin === window.location.origin) {
      this.event = msg.data.event;
      console.log(msg.data.event.name);
    }
  }

  didInsertElement() {
    window.addEventListener('message', this.receivedMessage);
  }

  willDestroy() {
    window.removeEventListener('message', this.receivedMessage);
  }
};
