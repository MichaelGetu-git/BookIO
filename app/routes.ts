import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/","routes/Layout.tsx", { }, [
        index("routes/home.tsx"),
        route("/bookreader","routes/bookreader.tsx"),
        route("/store", "routes/store.tsx"),
    ])

] satisfies RouteConfig;
