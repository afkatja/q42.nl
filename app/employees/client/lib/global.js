import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { ReactiveDict } from 'meteor/reactive-dict'

Meteor.startup( () => Session.setDefault("employees_filter", "Q'er") );

export let polaroidVisibility = new ReactiveDict();
