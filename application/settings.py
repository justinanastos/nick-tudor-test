#-- Configuration for Flask app

class Config(object):
    #-- Flask-Cache settings
    CACHE_TYPE = 'gaememcached'
    #-- Temp key for the Debug Toolbar
    SECRET_KEY = 'lob-fit-crux-bit-fold'

class Development(Config):
    DEBUG = True
    ENV = 'DEV'
    # Flask-DebugToolbar settings
    DEBUG_TB_PROFILER_ENABLED = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CSRF_ENABLED = True

class Testing(Config):
    TESTING = True
    DEBUG = True
    CSRF_ENABLED = True

class Production(Config):
    DEBUG = False
    ENV = 'PROD'
    CSRF_ENABLED = True
