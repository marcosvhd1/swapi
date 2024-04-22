import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { router } from "./routes/routes";
import { queryClient } from "./services/QueryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center min-h-screen bg-neutral-800">
        <Header />
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
