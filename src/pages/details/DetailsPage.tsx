import type { detailsLoaderResult } from "./detailLoader";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Related from "./related/related";
import AnimeReview from "./animeReview/animeReview"


export default function DetailsPage() {
  const { details } = useLoaderData() as detailsLoaderResult;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [details]);

  return (
    <div className="flex flex-col w-full mt-4 bg-gray-900 min-h-screen">
      
      <div className="text-pink-100 text-4xl font-bold p-4">
        <p>{details.data.title} - {details.data.year}</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader color="pink" />
        </div>
      ) : (
        <>
        
          <div className="flex flex-col w-full mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 justify-items-center ">
              <div className="w-full grid-rows-2 lg:grid-rows-1 gap-0 justify-items-center">
                <img
                  className="w-96 h-128 object-fit"
                  src={details.data.images.webp.image_url}
                  alt={details.data.title}
                />
                <div className="grid grid-cols-2 gap-1 text-xl py-2">
                  <p className="text-white py-2">
                    <span className="text-xl font-bold text-pink-500">
                      Type:{" "}
                    </span>
                    {details.data.type}
                  </p>
                  <p className="text-white py-2">
                    <span className="text-xl font-bold text-pink-500">
                      Episodes:{" "}
                    </span>
                    {details.data.episodes}
                  </p>
                  
                  <p className="text-white py-2">
                    <span className="text-xl font-bold text-pink-500">
                      Score:{" "}
                    </span>
                    {details.data.score}
                  </p>
                  <p className="text-white py-2">
                    <span className="text-xl font-bold text-pink-500">
                      Rank:{" "}
                    </span>
                    {details.data.rank}
                  </p>
                  <div className="col-span-2">
                    <p className="text-white py-2">
                      <span className="text-xl font-bold text-pink-500">
                        Status:{" "}
                      </span>
                      {details.data.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <iframe
                  className="aspect-video w-full h-96"
                  src={details.data.trailer.embed_url}
                ></iframe>
                <p className="text-white py-5">
                  <span className="text-xl font-bold text-pink-500">
                    Synosis:{" "}
                  </span>
                  {details.data.synopsis}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-4">
            <AnimeReview key={details.data.mal_id} mal_id={details.data.mal_id} />
          </div>
          <div className="flex flex-col w-full mb-4">
            <h3 className="text-pink-100 text-2xl font-bold p-4">
              Related Anime
              </h3> 
            <Related key={details.data.mal_id} type={details.data.type} />
          </div>
        </>
      )}
    </div>
  );
}
