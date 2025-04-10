import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.jsx";
import App from "./App.jsx";
import Favoritos from "./pages/Favoritos.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/favoritos",
                element: <Favoritos />,
            },
        ],
    },
]);

export default router;
