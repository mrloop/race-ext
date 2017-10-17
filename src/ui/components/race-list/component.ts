import Component, { tracked } from '@glimmer/component';

export default class RaceList extends Component {

  @tracked selectedRace = null;

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
