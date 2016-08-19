import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import { reattachBehavior } from '../lib/attach'

Template.body.onRendered( () => Meteor.setTimeout(reattachBehavior, 100) );
