defmodule TagDefs.Tags do
  import Phoenix.Naming, only: [resource_name: 2]
  import Phoenix.Template
  import Phoenix.HTML, only: [raw: 1]

  def p(text, attributes \\ [], do: block) do
  end
  def script(text, attributes \\ [], do: block) do
  end
  def h1(text, attributes \\ [], do: block) do
  end
  def h2(text, attributes \\ [], do: block) do
  end
  def h3(text, attributes \\ [], do: block) do
  end
  def h4(text, attributes \\ [], do: block) do
  end
  def h5(text, attributes \\ [], do: block) do
  end
  def h6(text, attributes \\ [], do: block) do
  end
  def section(text, attributes \\ [], do: block) do
  end

  def script(src: src), do: script(src: src, path: "/js")
  def script(src: src, path: path) do
    raw ~s{<script src="#{path}/#{src}.js"></script>}
  end

  def tag_for(tag_name, do: block) when is_atom(tag_name), do: tag_for(Atom.to_string(tag_name), do: block)
  def tag_for(tag_name, do: block) when is_binary(tag_name) do
    do_open(tag_name)
    <> block
    <> do_close(tag_name)
  end

  defp do_open(tag_name, attributes \\ []) do
    "<" <> tag_name <> " " <> attributes_to_string(attributes) <> ">"
  end

  defp do_close(tag_name) do
    "</" <> tag_name <> ">"
  end

  def get_scope_name(view_module, suffix \\ "View") do
    resource_name(view_module, suffix)
  end

  defp attributes_to_string(list) do
    list
    |> Enum.map(fn {key, value} ->
      Atom.to_string(key) <> "=\"" <> value <> "\""
    end)
    |> Enum.join(" ")
    |> Kernel.<> " "
  end
end