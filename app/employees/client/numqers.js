import { Template } from 'meteor/templating'

import { Employees } from '../lib/shared'

Template.numQers.helpers({
  numQers: () => Employees.find().count()
});
