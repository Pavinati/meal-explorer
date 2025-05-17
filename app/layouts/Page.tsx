import { Link, Outlet } from "react-router";
import { SearchMealForm } from "~/components/SearchMealForm";
import logo from "~/assets/images/logo.png";

export default function Page() {
  return (
    <div className="bg-white text-(--color-text)">
      <div className="flex max-w-5xl flex-col md:mx-auto">
        <header className="flex flex-row gap-2">
          <Link to="/">
            <img className="size-16" src={logo} alt="Meal explorer logo" />
          </Link>
          <div className="content-center text-xl font-bold">Meal Explorer</div>
        </header>
        <div className="sticky top-0 z-10 bg-white p-2">
          <SearchMealForm />
        </div>
        <main className="m-2 mb-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
