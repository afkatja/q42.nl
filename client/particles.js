$Template({
  header: {
    rendered: function() {
      function c(n) { if (!n) n = 255; return ~~(Math.random() * n); }
      function rgba(r, g, b, a) { return "rgba("+r+","+g+","+b+","+a+")"; }
      function rc(n, a) { return rgba(c(n), c(n), c(n), a); }
      function rp() { return ~~((Math.random()*2-1)*250); }
      function rr() { return ~~((Math.random()*2-1)*20); }
      function between(a, b) { return Math.max(a, ~~(Math.random()*b)); }

      function generateparticles(numparticles) {
        var particles = $(".particle");
        $("#particles").html("");
        _.times(numparticles, function(n){ generateparticle(n) });
        $("head").append($style);
      }

      function generateparticle(i) {
        var $particle = $("<div/>");
        $particle.addClass("particle");
        $particle.attr("id", "particle" + i);

        var delay = ~~(Math.random() * 4) + "s";
        var duration = between(10, 60) + "s";
        var animationValue = "float-particle"+i+" "+duration+" "+delay+" ease-in-out infinite alternate";

        _.each(["webkit", "moz", "ms", "o"], function(type) {
          $particle.css("-" + type + "-animation", animationValue);
        });
        $particle.css("animation", animationValue);

        var dim = ~~(Math.random() * 150);
        $particle.css("width", dim + "px");
        $particle.css("height", dim + "px");

        var color = rc(0, .8);
        $particle.css("backgroundColor", color);

        var x = ~~((Math.random()*2-1) * $(window).width());
        var y = rp();
        var z = -rp();

        var transform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
        _.each(["webkit", "moz", "ms", "o"], function(type) {
          $particle.css("-" + type + "-transform", transform);
        });
        $particle.css("transform", transform);
        $("#particles").append($particle);

        var dx = between(200, 500);
        dx = Math.random() < 0.5 ? dx : -dx;
        var dy = between(200, 500);
        dy = Math.random() < 0.5 ? dy : -dy;
        var dz = between(200, 500);
        dz = Math.random() < 0.5 ? dz : -dz;

        var anim = "";
        var keyframes = "";
        _.each(["webkit", "moz", "ms", "o"], function(type) {
          var from = "-" + type + "-transform: translate3d("+x+"px, "+y+"px, "+z+"px); opacity: 1;";
          var to = "-" + type + "-transform: translate3d("+(x+dx)+"px, "+(y+dy)+"px, "+(z+dz)+"px); opacity: 0";
          keyframes = "keyframes float-particle"+i+" { from {" + from + "} to {" + to + "} }";
          anim += "\n@-" + type + "-" + keyframes;
        });
        anim += "\n@" + keyframes;

        $style.html($style.html() + anim);
      }

      var $style = $("<style/>");
      $style.attr('type', 'text/css');
      $style.html("");

      var numparticles = 42;
      generateparticles(numparticles);

    }
  }
});