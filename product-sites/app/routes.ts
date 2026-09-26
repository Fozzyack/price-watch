import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product-1", "routes/product-1.tsx"),
] satisfies RouteConfig;
