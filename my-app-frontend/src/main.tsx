import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Router, NotFoundRoute } from "@tanstack/react-router";
import "./index.css";

import NotFound from "./not-found";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Route as rootRoute } from "./routes/__root";

const queryClient = new QueryClient();

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

// Create a new router instance
const router = new Router({ routeTree, notFoundRoute });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}