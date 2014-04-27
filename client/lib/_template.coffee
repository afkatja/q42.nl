# Helper to easily construct templates for multiple languages
@$Template = (templates) ->
  _.each templates, (values, tmpl) ->
    Template["en_#{tmpl}"]?.helpers values
    Template[tmpl]?.helpers values
