import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'

// Helper to easily construct templates for multiple languages
$Helpers = function(templates) {
  _.each(templates, (values, tmpl) => {
    _tmpl("helpers", tmpl, values);
  });
};
$Events = function(tmpl, events) {
  _tmpl("events", tmpl, events);
};
$OnRendered = function(tmpl, fn) {
  _tmpl("onRendered", tmpl, fn);
};
$OnCreated = function(tmpl, fn) {
  _tmpl("onCreated", tmpl, fn);
};

_tmpl = function(type, tmpl, obj) {
  Meteor.startup(() => {
    const result = Template["en_" + tmpl];
    if (result) result[type](obj);
    Template[tmpl][type](obj);
  });
};

export { $Helpers, $Events, $OnRendered, $OnCreated }
