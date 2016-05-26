import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'

import { Employees } from '../lib/shared'
import { currentQers } from './lib/qers'

_.each(currentQers, (e) => {
  e.labels = [];
  Employees.upsert({handle: e.handle}, e);
});

// Delete employees whose handles are no longer there
Employees.remove({
  handle: {
    $nin: _.map(currentQers, (e) => e.handle)
  }
});

Employees.allow({
  insert: () => false
});

Meteor.publish("employees", () => {
  return Employees.find({}, {sort: {name: 1}});
});
