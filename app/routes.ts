import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/Page.tsx", [
    index("routes/meals.tsx"),
    route("instructions", "routes/instructions.tsx"),
  ]),
] satisfies RouteConfig;
