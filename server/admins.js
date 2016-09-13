import { Meteor } from 'meteor/meteor'

// Blog admins
var admins = ['sjoerd@q42.nl', 'rahul@q42.nl', 'chris@q42.nl'];
Meteor.publish("allUserData", function () {
  Meteor.users.update({
    'services.google.email': { $in : admins } }, { $set: { isAdmin: true }
  });
  return Meteor.users.find({}, {fields: {
    'isAdmin': 1,
    'profile': 1,
    'services.github.id': 1,
    'services.github.email': 1,
    'services.facebook.id': 1,
    'services.google.id': 1,
    'services.google.picture': 1,
    'services.twitter.id': 1,
    'services.twitter.profile_image_url': 1
  }});
});
