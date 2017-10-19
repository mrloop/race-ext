import Component, { tracked } from '@glimmer/component';

export default class RaceList extends Component {

  @tracked selectedRace = null;

  set args(args) {
    if(!super.args || super.args.races !== args.races) {
      console.log(super.args)
      console.log(args);
      if(!args.races) {
        this.selectedRace = null;
      }
      super.args = args;
    }
  }

  get args() {
    return super.args;
  }

  select(race) {
    race.isLoading = true;
    race.entrants().then( ents => {
      race.isLoading = false;
    }).catch( err => {
      race.isLoading = false;
    });
    this.selectedRace = race;
  }
};
