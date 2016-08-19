import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { $OnRendered } from '../../../client/lib/_template'

syntaxHighlight = function() {
  let a = false;

  $('code').each(function() {
    $parent = $(this).parent();
    if ( !$parent.hasClass("prettyprint") && $parent.is("pre") ){
      $parent.addClass("prettyprint");
      a = true;
    }
  });

  if (a) return prettyPrint();
};

$OnRendered("blog", syntaxHighlight);
Template.blogpost.onRendered(syntaxHighlight);
