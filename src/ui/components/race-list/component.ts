import Component, { tracked } from '@glimmer/component';

export default class RaceList extends Component {

  @tracked aRace = null;
  @tracked entrants = [];
  @tracked isLoading = true;

  @tracked('aRace', 'args')
  get selectedRace() {
    if(this.args.races) {
      if(!!this.aRace && this.args.races.includes(this.aRace)) {
        return this.aRace;
      } else if(this.args.races.length === 1) {
        return this.args.races[0];
      }
    }
    return null;
  }

  @tracked('selectedRace')
  get hasSelected() {
    return !!this.selectedRace;
  }

  select(race) {
    race.isLoading = true;
    race.users = [];
    race.entrants().then( ents => {
      race.users = ents;
      race.isLoading = false;
    });
    this.aRace = race;
  }
};
