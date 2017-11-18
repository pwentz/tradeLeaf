export class MockDispatch {
  actions = [];

  dispatch = (action) => {
    if (typeof action == 'function') {
      return action(this.dispatch);
    }
    this.actions.push(action)
    return action;
  }

  reset() {
    this.actions = [];
  }
}
