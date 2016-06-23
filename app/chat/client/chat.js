import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'

import { $Events } from '../../../client/lib/_template'
import { ChatMessages } from '../lib/shared'

Meteor.startup(() => {
  Meteor.subscribe("chat");
  Session.setDefault("openChat", false);
});

sendChatMessage = () => {
  check(Meteor.userId(), String);

  let $input = $(Template.instance().find("input"));
  const msg = $input.val();

  check(msg, String);

  const lang = Meteor.settings.public.siteVersion;

  ChatMessages.insert({
    lang,
    userId: Meteor.userId(),
    msg: msg,
    date: new Date(),
    path: window.location.href
  });

  $input.val("");
  $input.focus();
};

$Events("header", {
  "click #chat-toggle": function(evt) {
    Session.set("openChat", !Session.get("openChat"));
  }
});

Template.chat.helpers({
  message: () => ChatMessages.find({}, {sort: {date: 1}}),
  user() {
    let user = Meteor.users.findOne(this.userId);
    if (user && user.profile && user.profile.name)
      return user.profile.name;
    else if (this.username) {
      return this.username;
    }
    else {
      return "Unknown";
    }
  }
});

Template.chat.events({
  "click .close": function(evt) {
    evt.preventDefault();
    Session.set("openChat", false);
  },
  "click button": sendChatMessage,
  "keyup input": function(evt) { if (evt.which === 13) sendChatMessage(); }
});

Template.chat.onRendered(() => {
  const $input = $(Template.instance().find("input"));
  $input.focus();
});
