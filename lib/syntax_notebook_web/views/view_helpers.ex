defmodule SyntaxNotebookWeb.ViewHelpers do
  alias TagDefs.Tags

  def render_script(view_module, assigns) do
    src_path =
      view_module
      |> Tags.get_scope_name()

    Tags.script(src: src_path)
  end
end