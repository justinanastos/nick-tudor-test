#-- Initialize Flask app
from application import views
from flask import Flask
from flask import render_template

import os

app = Flask('application')

if os.environ['SERVER_SOFTWARE'].startswith('Dev'):
    app.config.from_object('application.settings.Development')
else:
    app.config.from_object('application.settings.Production')

#-- Enable jinja2 loop controls extension
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

#--URL dispatch rules
# App Engine warm up handler
# See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests
app.add_url_rule('/_ah/warmup', 'warmup', view_func=views.warmup)

#site root
app.add_url_rule('/', 'main', view_func=views.main, defaults={'path': ''})
# Homepage catch-all
app.add_url_rule('/<path:path>', 'main', view_func=views.main)

## Error handlers
def handle_error(e):
    return render_template('%s.html' % e.code), e.code
