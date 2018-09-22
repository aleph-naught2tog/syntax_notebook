defmodule SyntaxNotebookWeb.PageController do
  use SyntaxNotebookWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
