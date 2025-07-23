import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase_client";

export function meta() {
  return [{ title: "New Item | VETORE" }];
}
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const nome = formData.get("nome") as string;
  const qtdItem = formData.get("quantidade") as unknown as number;

  if (!nome || !qtdItem) {
    return {
      error: "No content given",
    };
  }

  const { error } = await supabase.from("inventory").insert({ nome, qtdItem });

  if (error) {
    return { erorr: error.message };
  }

  return redirect("/");
}

export default function create() {
  return (
    <div className="p-50">
      <Form method="post" className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label  className="block text-sm text-gray-700">
            Nome do Item
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Ex: Monitor Dell"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label  className="block text-sm text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            placeholder="Ex: 10"
            min="1"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Adicionar
        </button>
      </Form>
    </div>
  );
}
