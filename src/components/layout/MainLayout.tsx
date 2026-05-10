import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-dvh justify-center overflow-hidden bg-zinc-900">

      {/* Tablet Frame */}
      <div className="flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-zinc-100 shadow-2xl">

        {/* Questo abilita gli scroll interni */}
        <div className="flex flex-1 min-h-0 flex-col">
          <Outlet />
        </div>

      </div>
    </div>
  );
}