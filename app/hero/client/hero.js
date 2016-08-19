import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

// Template.hero.onRendered(function() {
//   const client = new WebSocket('ws://q42-live-1.herokuapp.com/test');
//   const canvas = document.getElementById('bg-video');
//   try {
//     new jsmpeg(client, {canvas:canvas});
//   }
//   catch (e) {}
// });

Template.hero.helpers({
  show: function() {
    return (FlowRouter.getRouteName() === "home");
  }
});
