import Component, { tracked } from '@glimmer/component';

export default class RaceDetail extends Component {

  @tracked status = "Loading ...";
  @tracked race = null;
  @tracked _users = [];

  //@race set
  @tracked('args', '_users')
  get users() {
    this.initListeners();
    this._users = this.race._users;
    return this._users;
  }

  entrantLoaded(data) {
    this._users = data.detail.users;
    this.status = `Loading ${data.detail.loaded}/${data.detail.total}`
  }

  entrantError(data) {
    if(data.detail.error.name !== "AbortError") {
      console.error(data.detail.error);
      this.status = `Error Loading: ${data.detail.error}`;
    }
  }

  initListeners() {
    if(this.race !== this.args.race) {
      this.teardownListeners(this.race);
      this.race = this.args.race;
      this.setupListeners(this.race);
    }
  }

  setupListeners(race) {
    if(race) {
      this.entrantLoaded = this.entrantLoaded.bind(this);
      this.entrantError = this.entrantError.bind(this);
      race.addEventListener('entrantLoaded', this.entrantLoaded);
      race.addEventListener('entrantError', this.entrantError);
    }
  }

  teardownListeners(race) {
    if(race) {
      race.removeEventListener('entrantLoaded', this.entrantLoaded);
      race.removeEventListener('entrantError', this.entrantError);
    }
  }
};
