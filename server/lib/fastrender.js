import { FastRender } from 'meteor/meteorhacks:fast-render'

FastRender.onAllRoutes(function() {
  this.subscribe("employeeCount");
  this.subscribe("allUserData");
});

FastRender.route( "/", function() {
  this.subscribe("employeeCount");
});
