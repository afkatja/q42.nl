import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { _ } from 'meteor/underscore'

import { Employees } from '../lib/shared'

const employeeSort = {sort: {handle: 1}}

Template.employees.helpers({
  employee() {
    const filter = Session.get("employees_filter");
    if (_.first(filter) === "/" && _.last(filter) === "/") {
      let regex;

      try {
        regex = new RegExp(_.without(filter, "/").join(""), "i");
      } catch (error){
        console.log(error);
      }

      if (regex){
        return Employees.find({
          $or: [{name: regex}, {phone: regex}, {handle: regex}, {web: regex}]
        });
      }

    } else if (filter !== "" && filter !== "Q'er"){
      return Employees.find({labels: {$in: [filter]}}, employeeSort);

    } else {
      return Employees.find({}, employeeSort);
    }
  },

  filter: () => Session.get("employees_filter")
});

Template.en_employees && Template.en_employees.helpers({
  employee: () => Employees.find({}, employeeSort)
});
