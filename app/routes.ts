import { type RouteConfig, index ,route} from "@react-router/dev/routes";

export default [
    index("components/welcome.tsx"), 
    route("gallery", "components/catalog.tsx"),
] satisfies RouteConfig;

