import { IoLogoFacebook } from "react-icons/io";
import { FaGithubSquare } from "react-icons/fa";

export default function Contact() {
  const contact = [
    {
      name: "Facebook",
      icon: <IoLogoFacebook className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-blue-600" />,
      link: "https://web.facebook.com/thanawit.rungsangchan/",
    },
    {
      name: "Github",
      icon: <FaGithubSquare className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-gray-800" />,
      link: "https://github.com/jhajathanawit?tab=repositories",
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fdf6fc]/80">
      <h3 className="text-5xl sm:text-7xl md:text-9xl font-bold text-pink-500 my-8 text-center">Contact Me</h3>
      <div className="w-full flex flex-col items-center gap-8">
        {contact.map((item) => (
          <div
            key={item.name}
            className="bg-white/80 rounded-3xl p-6 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full max-w-[90vw] sm:max-w-[60vw] md:max-w-[40vw] flex flex-col items-center"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4"
            >
              {item.icon}
              <span className="text-4xl sm:text-6xl md:text-7xl text-pink-500 font-semibold">{item.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}