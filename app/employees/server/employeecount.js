import { Meteor } from 'meteor/meteor'
import { Employees, EmployeeCount } from '../lib/shared'

Meteor.startup( () => {
  if ( EmployeeCount.findOne() ){
    EmployeeCount.update(
      EmployeeCount.findOne()._id,
      {$set: {count: Employees.find().count()}},
      {upsert: true}
    );
  } else {
    EmployeeCount.insert({count: 0});
  }
});

Meteor.publish("employeeCount", () => EmployeeCount.find());
