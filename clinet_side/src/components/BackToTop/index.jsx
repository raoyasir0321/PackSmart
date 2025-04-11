import { ArrowLeft, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";


export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      <div className="fixed bottom-8 right-8 z-50">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 bg-[#0287ca] text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
            title="Back to Top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    );
  };
  