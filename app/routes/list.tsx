import { Link, type LoaderFunctionArgs } from "react-router";
import { supabase } from "~/supabase_client";
import type { Route } from "./+types/list";

export function meta() {
  return [{ title: "Consultor de Itens | VETORE" }];
}

export async function loader() {
  const { data, error } = await supabase.from("Inventory_vet").select("*");

  if (error) {
    return { error: error.message };
  }

  return { item: data };
}
export default function list({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;
  return (
    <div className="container mx-auto grid p-5 justify-center text-center">
      <h2 className="block text-xl font-bold bg-blue-200 border"> Lista de Itens </h2>
      <table className="border bg-blue-300">
        <tr className="space-x-3.5 border">
          <th className="px-40 py-2 border">Nome</th>
          <th className="px-40 py-2 border">Descrição</th>
          <th className="px-40 py-2 border">Qtd</th>
        </tr>

          {item?.map((item) => (
            <tr key={item.id} className="border">
              <td className="border"><Link to={`item/${item.id}`}>{item.nome}</Link></td>
              <td className="border">{item.desc}</td>
              <td className="border">{item.qtdItem}</td>
            </tr>
          ))}

      </table>
    </div>
  );
}
