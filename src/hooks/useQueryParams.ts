import { useCallback, useEffect, useState } from "react";

type QueryParams = Record<string, string>;

const useQueryParams = () => {
  const [query, setQuery] = useState<QueryParams>(() => {
    const params = new URLSearchParams(window.location.search);
    const result: QueryParams = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  });

  const updateQuery = useCallback((newParams: Partial<QueryParams>) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${
      newSearch ? `?${newSearch}` : ""
    }`;
    window.history.replaceState({}, "", newUrl);

    // Update state
    const updated: QueryParams = {};
    params.forEach((v, k) => {
      updated[k] = v;
    });
    setQuery(updated);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const result: QueryParams = {};
      params.forEach((value, key) => {
        result[key] = value;
      });
      setQuery(result);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return { query, setQuery: updateQuery };
};

export default useQueryParams;
