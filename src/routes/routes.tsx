import { createBrowserRouter } from "react-router-dom";
import { DetailsPage } from "../pages/Details/DetailsPage";
import { HomePage } from "../pages/Home/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/details/:id",
        element: <DetailsPage />
    },
]);