#-- URL Handlers
from functools import wraps
from flask import render_template
from flask import request
from flask import Response
import logging

def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == '' and password == ''

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

def main(path):
    if "PhantomJS" in request.headers.get('User-Agent'):
        return render_template('homepage.html')

    if (request.headers.get('User-Agent').startswith('facebookexternalhit') or
        request.headers.get('User-Agent').startswith('LinkedInBot') or
        'Google' in request.headers.get('User-Agent')):
        path = request.path
        logging.info('PATH IS:' + path)
        if len(path) > 4:
            snapshotName = 'app' + path.replace('/', '_') + '.html'
            snapshotPath = 'snapshots/' + snapshotName
        else:
            snapshotPath = 'snapshots/app_.html'
        return render_template(snapshotPath)

    if request.args.get('_escaped_fragment_'):
        path = request.args.get('_escaped_fragment_')
        snapshotName = 'app_' + path.replace('/', '_') + '.html'
        snapshotPath = 'snapshots/' + snapshotName
        return render_template(snapshotPath)

    return render_home(path)

@requires_auth
def render_home(path):
    return render_template('homepage.html')

def warmup():
    """App Engine warmup handler
    See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests

    """
    return ''

