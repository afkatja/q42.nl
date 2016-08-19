import { Template } from 'meteor/templating'
import { Utils } from '../../../lib/utils'
import { $Helpers } from '../../../client/lib/_template'
import { Toilets } from '../lib/shared'

Template.toilets.helpers({
  getState: function() {
    if ( Meteor.settings.public.siteVersion === "nl" ){
      this.state = this.state === "occupied" ? "bezet" : "vrij";
    }
    return this.state;
  }
});

$Helpers({
  toilets: {
    toilet: () => Toilets.find()
  }
});
