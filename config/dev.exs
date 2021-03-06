use Mix.Config

config :syntax_notebook,
       SyntaxNotebookWeb.Endpoint,
       http: [
         port: 4000
       ],
       debug_errors: true,
       code_reloader: true,
       check_origin: false,
       watchers: [
         node: [
           "node_modules/brunch/bin/brunch",
           "watch",
           "--stdin",
           cd: Path.expand("../assets", __DIR__)
         ],
         npm: [
           "run",
           "webpack_watch",
           cd: Path.expand("../assets", __DIR__)
         ],
         ## The Node version works identically but is a little slower.
         # node: [
         #   "node_modules/sass/sass.js",
         #   "--watch",
         #   "scss:css",
         #   cd: Path.expand("../assets", __DIR__)
         # ],
         #    If you have a binary installed of scss/sass, you can use that instead:
         scss: [
           "--watch",
           "scss:css",
           cd: Path.expand("../assets", __DIR__)
         ],
       ]


# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# command from your terminal:
#
#     openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" -keyout priv/server.key -out priv/server.pem
#
# The `http:` config above can be replaced with:
#
#     https: [port: 4000, keyfile: "priv/server.key", certfile: "priv/server.pem"],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :syntax_notebook,
       SyntaxNotebookWeb.Endpoint,
       live_reload: [
         patterns: [
           ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
           ~r{priv/gettext/.*(po)$},
           ~r{lib/syntax_notebook_web/views/.*(ex)$},
           ~r{lib/syntax_notebook_web/templates/.*(eex)$}
         ]
       ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :syntax_notebook,
       SyntaxNotebook.Repo,
       adapter: Ecto.Adapters.Postgres,
       username: "postgres",
       password: "postgres",
       database: "syntax_notebook_dev",
       hostname: "localhost",
       pool_size: 10
