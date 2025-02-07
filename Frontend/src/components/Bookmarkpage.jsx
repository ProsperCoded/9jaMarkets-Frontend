import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-full max-w-md h-[100vh] container mx-auto p-4">
      <div className="flex items-center mb-4">
        <Link to="/" className="text-Primary hover:text-orange">
          <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold ml-4 text-Primary ">Bookmarks</h1>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-Primary text-center">No bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
              <Link to={item.link} className="text-orange hover:underline">
                {item.title}
              </Link>
              <button onClick={() => removeBookmark(item.id)} className="text-red-500 hover:text-red-700">
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarksPage;
