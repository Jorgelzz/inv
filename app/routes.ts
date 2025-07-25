import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/list.tsx"),
    route("new", "routes/newItem.tsx"),
    route('item/:id', "routes/item.tsx")
] satisfies RouteConfig;
