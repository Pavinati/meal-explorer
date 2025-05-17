import { useCallback, useState } from "react";
import { Form } from "react-router";
import { FaSearch } from "react-icons/fa";

type SearchMealFormProps = {
  initialSearch?: string | null;
};

export function SearchMealForm({ initialSearch }: SearchMealFormProps) {
  const [searchString, setSearchString] = useState(initialSearch || "");

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newString = e.target.value;
      setSearchString(newString);
    },
    [],
  );

  return (
    <Form className="flex flex-row gap-2" action="/">
      <label className="sr-only" htmlFor="recipe-search">
        Search for a recipe
      </label>
      <div className="flex grow flex-row gap-2 rounded border px-3 py-2 align-middle text-(--color-text) shadow">
        <div aria-hidden>
          <FaSearch className="h-full" />
        </div>
        <input
          className="focus:shadow-outline grow focus:outline-none"
          id="recipe-search"
          name="s"
          type="search"
          placeholder="Soup"
          value={searchString}
          onChange={handleSearchInputChange}
        />
      </div>
      <button
        className="grow-0 rounded bg-(--color-primary) px-3 py-1 text-white"
        type="submit"
      >
        Search
      </button>
    </Form>
  );
}
