import { Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-rose-100 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        
        <p className="italic tracking-wide text-center md:text-left">
          Made with ❤️ by Sweta — Map Your Memories © {new Date().getFullYear()}
        </p>

        <div className="flex gap-4">
          <a href="https://github.com/SwetaJaiswal9" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/sweta-jaiswal9/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
