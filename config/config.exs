# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :syntax_notebook,
  ecto_repos: [SyntaxNotebook.Repo]

# Configures the endpoint
config :syntax_notebook, SyntaxNotebookWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ZR5z0QW8VM8vWlORTj1pFBw7mJFnl5gDbabUGjjIug6rNbJJmP+o2napurrTdjb9",
  render_errors: [view: SyntaxNotebookWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: SyntaxNotebook.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
