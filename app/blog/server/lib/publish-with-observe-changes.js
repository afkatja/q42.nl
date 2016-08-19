import { Meteor } from 'meteor/meteor'

// Modification of the standard Meteor publish method
// This one also includes observeChanges handlers
export const publishWithObserveChanges = function (name, fn) {
  Meteor.publish(name, function() {
    const self = this;
    const cursor = fn.apply(this, arguments);
    if (!cursor) {
      this.ready();
      return;
    }
    const handle = cursor.observeChanges({
      added(id, fields) {
        self.added(name, id, fields);
      },
      changed(id, fields) {
        self.changed(name, id, fields);
      },
      removed(id) {
        self.removed(name, id);
      }
    });
    self.ready();
    self.onStop(function() {
      handle.stop();
    });
  });
};
