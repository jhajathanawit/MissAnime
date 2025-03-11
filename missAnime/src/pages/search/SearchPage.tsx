import { useLoaderData, useLocation } from "react-router-dom";
import PackagesListItem from "../../components/PackagesListItem";
import { SearchLoaderResult } from "./searchLoader";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function SearchPage() {
  const { searchResult } = useLoaderData() as SearchLoaderResult;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "desc";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [searchResult]);

  const sortedResults = [...searchResult].sort((a, b) => {
    if (sort === "asc") {
      return a.score - b.score;
    } else {
      return b.score - a.score;
    }
  });

  const renderPackages = sortedResults.map((result, index) => (
    <PackagesListItem pack={result} key={`${result.mal_id}-${index}`} />
  ));

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-white">Result : "{searchTerm}"</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader color="pink" />
        </div>
      ) : (
        <div className="grid grid-cols justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-10px">
          {renderPackages}
        </div>
      )}
    </div>
  );
}