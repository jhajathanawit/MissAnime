import { IoLogoFacebook } from "react-icons/io";
import { FaGithubSquare } from "react-icons/fa";

export default function Contact() {
  const contact = [
    {
      name: "Facebook",
      icon: <IoLogoFacebook className="w-[10rem] h-[10rem] text-blue-600" />,
      link: "https://web.facebook.com/thanawit.rungsangchan/",
    },
    {
      name: "Github",
      icon: <FaGithubSquare className="w-[10rem] h-[10rem] text-gray-800" />,
      link: "https://github.com/jhajathanawit?tab=repositories",
    }
  ];

  return(
    <div className="flex flex-col items-center min-h-screen  ">
      <div>
        <h3 className="text-[15rem] text-white">contact me</h3>
        </div>
      {contact.map((item) => (
        <div className=" bg-[#fdf6fc]/80 rounded-[5rem] p-4 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full max-w-[70vw] text-center">
          <a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 ml-[6rem]"
        >
          {item.icon}
          <h2 className="text-[10rem] text-pink-500 mx-auto">{item.name}</h2>
        </a></div>
        
      ))}
    </div>
  );
}