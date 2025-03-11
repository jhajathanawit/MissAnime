import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../styles.css';
import { Link } from 'react-router-dom';

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
  url: string;
  rank?: number;
  score?: number;
}

const SwiperComponent: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const progressCircle = useRef<SVGCircleElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.jikan.moe/v4/recommendations/anime");
        const data = await response.json();
        console.log(data, "upcoming anime");

        if (data && data.data && data.data.length > 0) {
          const topAnime = data.data.slice(0, 14);
          setAnimeList(
            topAnime.map((anime: any) => ({
                mal_id: anime.entry[0].mal_id,
                title: anime.entry[0].title,
                image_url: anime.entry[0].images.jpg.image_url,
                url: anime.entry[0].url,
                rank: anime.rank,
                score: anime.score,
            }))
          );
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch anime data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"
      style={{ borderRadius: '10px' }}
    >
      {animeList.map((anime) => (
        <SwiperSlide key={anime.mal_id}>
          <div
            className="swiper-slide-content"
            style={{
              position: 'relative',
              height: '40rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${anime.image_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                zIndex: 1,
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            ></div>
            <Link to={`/packages/${anime.mal_id}`} className="object-cover m-4">
            <img
              src={anime.image_url}
              alt={anime.title}
              style={{ width: 'auto', height: '25rem', objectFit: 'contain', position: 'relative', zIndex: 2,border: '1px solid white',borderRadius:'10px',boxShadow: '2.5px 2.5px 10px black' }}
            />
            </Link>
            <h3
              style={{
                position: 'absolute',
                top: '90%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '5px',
                zIndex: 3,
                borderRadius: '5px',
                width: '90%',
                fontSize: '2rem',
              }}
            >
              {anime.title}
            </h3>
          </div>
        </SwiperSlide>
      ))}
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
};

export default SwiperComponent;