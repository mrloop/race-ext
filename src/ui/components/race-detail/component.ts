import Component, { tracked } from '@glimmer/component';

export default class RaceDetail extends Component {

  @tracked status = "Loading ...";
  @tracked users = [];

  willDestroy() {
    this.teardownListeners(this.args.race);
  }

  set args(args) {
    //race is changing
    if(!super.args || super.args.race !== args.race ) {
      if(this.args) {
        this.teardownListeners(this.args.race);
      }
      super.args = args;
      this.setupListeners(this.args.race);
    }
  }

  //https://stackoverflow.com/questions/34456194/is-it-possible-to-call-a-super-setter-in-es6-inherited-classes
  get args() {
    return super.args;
  }

  entrantLoaded(data) {
    this.users = data.detail.users;
    this.status = `Loading ${data.detail.loaded}/${data.detail.total}`
  }

  entrantError(data) {
    if(data.detail.error.name !== "AbortError") {
      console.error(data.detail.error);
      this.status = `Error Loading: ${data.detail.error}`; }
  }

  setupListeners(race) {
    if(race && race.addEventListener) { //race not an object during testing
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
