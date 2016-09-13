import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { RouteUtils } from './lib/routeutils'

customPages = (router) => {

  customPage = (obj) => {
    FlowRouter.route(obj.path, {
      name: obj.routeName,
      triggersEnter: [() => Meteor.call("checkTumblr")],
      action() {
        BlazeLayout.render("main", {
          header: "header",
          footer: "footer",
          body: RouteUtils.getTemplate(obj.routeName) || "error404"
        });
      }
    });
  };

  customPage({
    routeName: "meteor",
    path: "/meteor",
    tags: ["meteor"]
  });

  customPage({
    routeName: "swift",
    path: "/swift",
    tags: ["swift"]
  });

  customPage({
    routeName: "vacatures",
    path: "/vacatures",
    tags: ["vacature"]
  });

  customPage({
    routeName: "girlcode",
    path: "/girlcode",
    tags: ["girlcode"]
  });

};
