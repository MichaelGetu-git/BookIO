import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/","routes/Layout.tsx", { }, [
        index("routes/home.tsx"),
        route("/store", "routes/store.tsx"),
        route("/upload","routes/bookStore.tsx")
    ]),
    route("/login", "routes/login.tsx"),
    route("/signup", "routes/signup.tsx"),
    route("/bookreader/:pdfUrl","routes/bookreader.tsx"),
    route("/createbook", "routes/createbook.tsx"),

] satisfies RouteConfig;
