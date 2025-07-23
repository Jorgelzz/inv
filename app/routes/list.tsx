import { Link, type LoaderFunctionArgs } from "react-router";
import { supabase } from "~/supabase_client";
import type { Route } from "./+types/list";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data, error } = await supabase.from("inventory").select("*");

  if (error) {
    return { error: error.message };
  }

  return { item: data };
}
export default function list({ loaderData }: Route.ComponentProps) {
  const { error, item } = loaderData;
  return (
    <div>
      {" "}
      <h2> Lista de Itens </h2>
      <div> {error && <div> {error} </div>}</div>
      <ul>
        {item?.map((item) => (
          <Link to={"/"}>
            <li>
              <span>{item.nome}</span>
                <p>{item.qtdItem}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
