import { supabase } from "~/supabase_client";
import type { Route } from "./+types/item";
import { Form, redirect, type ActionFunctionArgs } from "react-router";


export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) {
    return { error: "No item found." };
  }
  const { data, error } = await supabase
    .from("Inventory_vet")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { error: error.message };
  }
  return {
    item: data,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const nome = formData.get("nome") as string;
  const qtdItem = formData.get("quantidade") as unknown as number;
  const desc = formData.get("desc") as string;

  const intent = formData.get("intent");

  if (intent === "delete") {
    const { error } = await supabase
      .from("Inventory_vet")
      .delete()
      .eq("id", params.id);
    if (error) {
      return { error: error.message };
    }
  } else if (intent === "update") {
    const { error } = await supabase
      .from("Inventory_vet")
      .update({ nome, qtdItem, desc })
      .eq("id", params.id);
  }
  return redirect('/')
}

export default function Item({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  return (
    <div className="p-50">
      <Form
        method="post"
        className="max-w-sm mx-auto  bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-700">Nome do Item</label>
          <input
            type="text"
            id="nome"
            defaultValue={item.nome}
            name="nome"
            placeholder="Ex: Notebook"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Descrição</label>
          <input
            type="text"
            id="desc"
            defaultValue={item.desc}
            name="desc"
            placeholder="Ex: Patrimonio / Nomenclatura "
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            defaultValue={item.qtdItem}
            placeholder="Ex: 10"
            min="1"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          name="intent"
          type="submit"
          value="update"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Editar
        </button>
        <button
          name="intent"
          type="submit"
          value="delete"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Deletar
        </button>
      </Form>
    </div>
  );
}
