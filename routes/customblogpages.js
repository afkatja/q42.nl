import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { RouteUtils } from './lib/routeutils'

customBlogPages = (router) => {

  customPageWithBlogTags = (obj) => {
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

  customPageWithBlogTags({
    routeName: "meteor",
    path: "/meteor",
    tags: ["meteor"]
  });

  customPageWithBlogTags({
    routeName: "swift",
    path: "/swift",
    tags: ["swift"]
  });

  customPageWithBlogTags({
    routeName: "vacatures",
    path: "/vacatures",
    tags: ["vacature"]
  });

  customPageWithBlogTags({
    routeName: "girlcode",
    path: "/girlcode",
    tags: ["girlcode"]
  });

};
