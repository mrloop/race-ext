import Component, { tracked } from '@glimmer/component';

export default class RaceDetail extends Component {

  @tracked('args')
  get isLoading() {
    return this.args.race.isLoading;
  }

  @tracked('args')
  get users() {
    return this.args.race.users;
  }
};
