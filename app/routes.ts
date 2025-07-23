import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/app.tsx"),
    route("new", "routes/newItem.tsx"),
    route("list", "routes/list.tsx"),
] satisfies RouteConfig;
