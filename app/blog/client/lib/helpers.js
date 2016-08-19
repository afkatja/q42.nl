import { Template } from 'meteor/templating'

Template.registerHelper("widthEquals", function(width) {
  return this.width === width;
});
Template.registerHelper("typeIs", function(type) {
  return this.type === type;
});
