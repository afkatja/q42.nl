var blogpostFull = new Meteor.Collection("blogpostFull");
var blogpostIndex = new Meteor.Collection("blogpostIndex");

Deps.autorun(function() {
  Meteor.subscribe("blogpostIndex", Session.get("blogpage"), Session.get("blogtag"));
  Meteor.subscribe("blogpostFull", Session.get("blogpostid"));
  Meteor.subscribe("pagesByTag", Session.get("blogtag") || "");
  Meteor.subscribe("blogComments", Session.get("blogpostid"));
});

Template.en_blog.post = Template.blog.post = function() {
  var posts = blogpostIndex.find({}, {sort: {date: -1}});
  if (posts.count() > 0)
  {
    Session.set("blogloading", false);
    Meteor.call("checkTumblr");
  }
  return posts;
}
Template.en_blog.rendered = Template.blog.rendered = function() {
  toggleLoadingState();
  syntaxHighlight();
}
Template.en_blog.pagination = Template.blog.pagination = function() {
  var item = PageCounts.findOne({ tag: Session.get("blogtag") || "" });
  var pages = item ? item.count : 1;
  if (pages == 1)
    return [];

  var items = [];
  var page = Session.get("blogpage") || 1;
  if (page > 1)
    items.push({ label: "nieuwer", page: page - 1 })
  var min = Math.max(1, page - 3);
  var max = Math.min(pages, page + 3);
  for (var i = min; i <= max; i++)
    items.push({ label: i, page: i, active: i == page });
  if (page < pages)
    items.push({ label: "ouder", page: page + 1 })
  return items;
}
Template.en_blog.tag = Template.blog.tag = function() {
  return Session.get("blogtag");
}

Template.en_blogpost.post = Template.blogpost.post = function() {
  return blogpostFull.findOne();
}
Template.en_blogpost.rendered = Template.blogpost.rendered = function() {
  toggleLoadingState();

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=292443547438127";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

  syntaxHighlight();
}
Template.en_blogpost.comments = Template.blogpost.comments = function() {
  return BlogComments.find();
}
Template.en_blogpost.commentsCount = Template.blogpost.commentsCount = function() {
  return BlogComments.find().count();
}
Template.en_blogpost.oneComment = Template.blogpost.oneComment = function() {
  return BlogComments.find().count() == 1;
}
Template.en_blogpost.loggedin = Template.blogpost.loggedin = function() {
  return !!Meteor.user();
}
Template.en_blogpost.service = Template.blogpost.service = function() {
  var user = Meteor.users.findOne({ _id: this.userId });
  if (!user)
    return "";
  for (var p in user.services)
    return p;
}
Template.en_blogpost.picture = Template.blogpost.picture = function() {
  console.log(this.userId)
  var user = Meteor.users.findOne({ _id: this.userId });
  if (!user || !user.services)
    return "";
  var services = user.services;
  if (services.twitter)
    return "https://api.twitter.com/1/users/profile_image?user_id=" + services.twitter.id;
  if (services.google)
    return services.google.picture;
  if (services.facebook)
    return "https://graph.facebook.com/" + services.facebook.id + "/picture";
  if (services.github)
    return Gravatar.imageUrl(services.github.email);
  return ""
}
Template.en_blogpost.datediff = Template.blogpost.datediff = function() {
  return moment.duration(moment(Session.get("date")).diff(this.date)).humanize();
}

var templateBlogPostEvents = {
  "click #addComment": function()
  {
    Meteor.call("addComment", Session.get("blogpostid"), $("#comment")[0].value);
  }
};
Template.en_blogpost.events(templateBlogPostEvents);
Template.blogpost.events(templateBlogPostEvents);


Template.en_postDate.prettyDate = Template.postDate.prettyDate = function() {
  return moment(this.date).format('dddd D MMMM YYYY')
}

Template.en_otherPosts.post = Template.otherPosts.post = function() {
  return blogpostIndex.find({id: {$ne: Session.get('blogpostid')}, title: {$exists: true}}, {limit: 12}).fetch();
}

Handlebars.registerHelper("ifWidthEquals", function(width, options) {
  return this.width == width ? options.fn(this) : "";
});
Handlebars.registerHelper("debug", function(obj) {
  // console.log(obj)
});
Handlebars.registerHelper("typeIs", function(type) {
  return this.type == type;
})

function toggleLoadingState() {
  $(".blog,.block-text,.subcontent,#pageNav").toggleClass("loading", Session.get("blogloading"));
}

function syntaxHighlight() {
  var a = false;

  $('code').each(function() {
    if (!$(this).parent().hasClass('prettyprint')) {
      $(this).wrap('<pre class="prettyprint" />');
      a = true;
    }
  });

  if (a) prettyPrint();
}