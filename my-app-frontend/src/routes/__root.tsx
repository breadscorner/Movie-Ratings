import { RootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 max-w-xl mx-auto">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/create" className="[&.active]:font-bold">
          Create
        </Link>{" "}
      </div>
      <hr />
      <div className="max-w-xl mx-auto">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});