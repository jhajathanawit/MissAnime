import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../styles.css';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
const SwiperComponent = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
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
                    setAnimeList(topAnime.map((anime) => ({
                        mal_id: anime.entry[0].mal_id,
                        title: anime.entry[0].title,
                        image_url: anime.entry[0].images.jpg.image_url,
                        url: anime.entry[0].url,
                        rank: anime.rank,
                        score: anime.score,
                    })));
                }
            }
            catch (err) {
                setError(err.message || "Failed to fetch anime data");
            }
            finally {
                setLoading(false);
            }
        };
        fetchAnimeData();
    }, []);
    if (loading)
        return _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(SyncLoader, { color: "pink" }) });
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsxs(Swiper, { spaceBetween: 30, centeredSlides: true, autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }, pagination: {
            clickable: true,
        }, navigation: true, modules: [Autoplay, Pagination, Navigation], className: "mySwiper", style: { borderRadius: '10px' }, children: [animeList.map((anime) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "swiper-slide-content ", style: {
                        position: 'relative',
                        height: '32rem',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, children: [_jsx("div", { style: {
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
                            } }), _jsx(Link, { to: `/MissAnime/packages/${anime.mal_id}`, className: "object-cover m-4", children: _jsx("img", { src: anime.image_url, alt: anime.title, style: { width: 'auto', height: '25rem', objectFit: 'contain', position: 'relative', zIndex: 2, border: '1px solid white', borderRadius: '10px', boxShadow: '2.5px 2.5px 10px black' } }) }), _jsx("h3", { style: {
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
                            }, children: anime.title })] }) }, anime.mal_id))), _jsxs("div", { className: "autoplay-progress", slot: "container-end", children: [_jsx("svg", { viewBox: "0 0 48 48", ref: progressCircle, children: _jsx("circle", { cx: "24", cy: "24", r: "20" }) }), _jsx("span", { ref: progressContent })] })] }));
};
export default SwiperComponent;
