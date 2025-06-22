import { useCallback, useEffect, useState } from "react";

type QueryParams = Record<string, string>;
type Listener = (params: QueryParams) => void;

class QueryParamsManager {
  private listeners: Set<Listener> = new Set();
  private currentParams: QueryParams = {};

  constructor() {
    this.updateFromURL();

    window.addEventListener("popstate", () => {
      this.updateFromURL();
    });
  }

  private updateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const result: QueryParams = {};
    params.forEach((value, key) => {
      result[key] = value;
    });

    if (JSON.stringify(this.currentParams) !== JSON.stringify(result)) {
      this.currentParams = result;
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentParams));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    listener(this.currentParams);

    return () => {
      this.listeners.delete(listener);
    };
  }

  updateParams(newParams: Partial<QueryParams>) {
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
    this.updateFromURL();
  }

  resetParams() {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
    this.updateFromURL();
  }

  getCurrentParams() {
    return this.currentParams;
  }
}

const queryParamsManager = new QueryParamsManager();

const useQueryParams = () => {
  const [query, setQuery] = useState<QueryParams>(() =>
    queryParamsManager.getCurrentParams()
  );

  useEffect(() => {
    const unsubscribe = queryParamsManager.subscribe(setQuery);
    return unsubscribe;
  }, []);

  const updateQuery = useCallback((newParams: Partial<QueryParams>) => {
    queryParamsManager.updateParams(newParams);
  }, []);

  const resetQuery = useCallback(() => {
    queryParamsManager.resetParams();
  }, []);

  return {
    query,
    setQuery: updateQuery,
    resetQuery,
  };
};

export default useQueryParams;
