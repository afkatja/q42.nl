import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import { Employees } from '../lib/shared'

Template.filter_employees.helpers({
  list: () =>
    _.uniq(_.flatten(_.pluck(Employees.find().fetch(), "labels"))).sort(),
  selected: (filter) =>
    Session.equals("employees_filter", filter) ? "selected" : ""
});

// Dutch only
Template.filter_employees.events({
  "click li a": (evt) => {
    evt.preventDefault();
    const val = $(evt.target).text();
    Session.set("employees_filter", val);
    return false;
  },
  "keyup [data-role='filter-qers']": (evt) => {
    const val = $(evt.target).val();
    Session.set("employees_filter", val);
  }
});
