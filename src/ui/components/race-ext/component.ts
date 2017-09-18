import Component, { tracked } from '@glimmer/component';

export default class RaceExt extends Component {

  @tracked eventId = '';

  didInsertElement() {
    this.eventId = this.element.parentElement.getAttribute('event-id');
  }
}
