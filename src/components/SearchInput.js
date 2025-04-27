import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
export default function SearchInput() {
    const [term, setTerm] = useState("");
    const [tempTerm, setTempTerm] = useState(""); // เพิ่ม tempTerm
    const [score, setScore] = useState("desc");
    const [type, setType] = useState("tv");
    const [rating, setRating] = useState("");
    const navigate = useNavigate();
    const searchParams = useMemo(() => {
        return `search?q=${term}&type=${type}${rating}&order_by=scored_by&sort=${score}`;
    }, [term, score, type, rating]);
    const handleSubmit = (event) => {
        event.preventDefault();
        setTerm(tempTerm);
        navigate(searchParams);
    };
    const selectStyle = "py-2 px-2 border rounded-2xl bg-white text-black focus:outline-none focus:ring focus:border-blue-300";
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center", children: [_jsxs("div", { className: "relative w-screen max-w-md  flex items-center", children: [_jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3", children: _jsx(VscSearch, { className: "w-5 h-5 text-gray-500" }) }), _jsx("input", { value: tempTerm, onChange: (e) => setTempTerm(e.target.value), className: "pl-10 py-2 w-full border-0 shadow-none bg-white rounded-full  focus:ring-0 focus:outline-none", placeholder: "Search" }), _jsx("button", { className: "\r\n          absolute right-0 top-0 bg-pink-500 h-full w-15 flex items-center \r\n          justify-center rounded-r-full text-white\r\n          hover:bg-pink-300 transition duration-300 ease-in-out\r\n          ", type: "submit", children: _jsx(VscSearch, { className: "w-5 h-5 text-white" }) })] }), _jsxs("div", { className: "flex py-1 justify-center mr-1 items-center space-x-2", children: [_jsxs("select", { value: score, onChange: (e) => setScore(e.target.value), className: selectStyle, children: [_jsx("option", { value: "desc", children: "Max-Score" }), _jsx("option", { value: "asc", children: "Min-Score" })] }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: selectStyle, children: [_jsx("option", { value: "tv", children: "Tv" }), _jsx("option", { value: "movie", children: "Movie" }), _jsx("option", { value: "ova", children: "Ova" }), _jsx("option", { value: "special", children: "Special" }), _jsx("option", { value: "ona", children: "Ona" }), _jsx("option", { value: "music", children: "Music" }), _jsx("option", { value: "cm", children: "Cm" }), _jsx("option", { value: "pv", children: "Pv" }), _jsx("option", { value: "tv_special", children: "Tv_Special" })] }), _jsxs("select", { value: rating || "", onChange: (e) => setRating(e.target.value), className: selectStyle, children: [_jsx("option", { value: "&rating=", children: "All" }), _jsx("option", { value: "&rating=g", children: "G" }), _jsx("option", { value: "&rating=pg", children: "PG-Children" }), _jsx("option", { value: "&rating=pg13", children: "PG13" }), _jsx("option", { value: "&rating=r17", children: "R-17+" }), _jsx("option", { value: "&rating=r", children: "R+" }), _jsx("option", { value: "&rating=rx", children: "Rx(Hentai)" })] })] })] }));
}
