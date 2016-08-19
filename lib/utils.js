import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { PageCounts } from '../app/blog/collections'

const Utils = {

  getStaticAssetsUrl: () => {
    const url = "https://storage.googleapis.com/static.q42.nl";
    if (Meteor.isClient)
      return window.location.hostname === "localhost" ? "" : url;
    return url;
  },

  // return the pages to be displayed as pagination on the blog
  getPagination: (pageNum, tag) => {
    pageNum = pageNum * 1;
    const item = PageCounts.findOne({tag: (tag || "")});
    const pages = item ? item.count : 1;
    const lang = Meteor.settings.public.siteVersion;
    const older = lang === "en" ? "older" : "ouder";
    const newer = lang === "en" ? "newer" : "nieuwer";
    let items = [];

    if (pages !== 1) {
      const page = pageNum || 1;
      const min = Math.max(1, page - 3);
      const max = Math.min(pages, page + 3);

      if (page > 1) items.push({ label: newer, page: page - 1 });

      for (let i = min; i <= max; i++)
        items.push({ label: i, page: i, active: i === page });

      if (page < pages) items.push({ label: older, page: page + 1 });
    }

    return items;
  },

  // if the page is reloaded with a hash in the url,
  // scroll to the correct position
  setScrollPosition: () => {
    if (window.location.hash){
      const $el = $(window.location.hash);
      if ($el[0]){
        Meteor.setTimeout( (() => $el[0].scrollIntoView()), 100);
      } else {
        Meteor.setTimeout( (() => Utils.setScrollPosition()), 1000);
      }
    } else {
      window.scrollTo(0,0);
    }
  },

  // set the correct <title> and meta info
  setTitleAndMeta: () => {
    const routeName = FlowRouter.getRouteName();
    const blogpostFull = require('../app/blog/client/lib/collections').blogpostFull;
    document.title = "Q42";

    if (routeName !== "home" && routeName !== undefined) {
      let title = "";
      const post = blogpostFull.findOne();
      if (post) {
        title = post.title;
      } else {
        title = $('h1').first().text().trim();
        title = title.charAt(0).toUpperCase() + title.substring(1);
      }
      if (title)
        document.title = `${title} - Q42`;
    }
    $("meta[property='og:title']").attr("content", document.title);

    let imgSrc = $(".block-large img:first-of-type").attr("src");
    if ($(".blog-post").length > 0) {
      imgSrc = $(".blog-post img").attr("src");
      if (!imgSrc)
        imgSrc = `${Utils.getStaticAssetsUrl()}/images/q42-logo.png`;
    }
    $("meta[property='og:image']").attr("content", imgSrc);

    // fix url, since Facebook parses this into "localhost:20049"
    let currUrl = window.location.href;
    if (currUrl.indexOf("localhost") > -1)
      currUrl = currUrl.replace(/localhost:\d{4,5}/, "q42.nl");
    $("meta[property='og:url']").attr("content", currUrl);

    const desc = $(".blog-post p:not(.post-date)").first().text() ||
                 $("p:first-of-type").first().text();
    $("meta[property='og:description']").attr("content", desc);
    $("meta[name='description']").attr("content", desc);
  }

};

if (Meteor.isClient) {
  Meteor.startup(() => {
    _.each(_.keys(Template), (name) => {
      const tmpl = Template[name];
      if (tmpl && tmpl.onRendered)
        tmpl.onRendered(Utils.setTitleAndMeta);
    });
  });
}

export { Utils }
