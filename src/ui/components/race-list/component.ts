import Component, { tracked } from '@glimmer/component';

export default class RaceList extends Component {

  @tracked selectedRace = null;

  set args(args) {
    if(!super.args || super.args.races !== args.races) {
      if(!args.races) {
        this.selectedRace = null;
      } else if(args.races.length === 1) {
        this.selectedRace = args.races[0];
        this.load(this.selectedRace);
      }
      super.args = args;
    }
  }

  get args() {
    return super.args;
  }

  load(race) {
    race.entrants().then( ents => {
      race.isLoading = false;
    }).catch( err => {
      race.isLoading = false;
    });
  }

  select(race) {
    race.isLoading = true;
    this.selectedRace = race;
    this.load(race);
  }
};
