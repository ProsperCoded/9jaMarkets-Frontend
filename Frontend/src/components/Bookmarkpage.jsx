import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark, BookMarked, Trash2 } from "lucide-react";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from local storage or API
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((item) => item.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="w-full max-w-4xl min-h-[100vh] container mx-auto p-4">

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6 mt-20">
          {/* Empty State Animation */}
          <div className="relative">
            <Bookmark className="w-24 h-24 text-gray-300 animate-pulse" />
            <BookMarked className="w-12 h-12 text-orange absolute -bottom-4 -right-4 transform rotate-12" />
          </div>
          
          {/* Empty State Message */}
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-xl font-semibold text-Primary">
              Your Bookmark Collection is Empty
            </h2>
            <p className="text-gray-600">
              Save interesting markets and items for later by clicking the bookmark
              icon. Your saved items will appear here for easy access.
            </p>
            
            {/* CTA Button */}
            <Link 
              to="/markets" 
              className="inline-block mt-6 px-6 py-3 bg-Primary text-white rounded-full hover:bg-orange transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Markets
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link to={item.link} className="text-Primary hover:text-orange transition-colors">
                {item.title}
              </Link>
              <button
                onClick={() => removeBookmark(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarksPage;

