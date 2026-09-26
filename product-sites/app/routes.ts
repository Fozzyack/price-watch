import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product-1", "routes/product-1.tsx"),
  route("product-2", "routes/product-2.tsx"),
  route("product-3", "routes/product-3.tsx"),
  route("product-4", "routes/product-4.tsx"),
] satisfies RouteConfig;
