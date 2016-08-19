import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'

Meteor.startup(() => {
  _.each(Meteor.settings.private.serviceConfiguration, (settings) => {
    settings = _.extend(settings, {loginStyle: "popup"});
    ServiceConfiguration.configurations.upsert(
      {service: settings.service},
      settings
    );
  });
});
