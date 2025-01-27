import { Link } from "react-router-dom";
import Err404 from "../assets/404.png";

function NotFoundPage({ message }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-md mx-6 mt-8 mb-8 py-30 p-6 pb-20 rounded-2xl">
      <img src={Err404} alt="404" className="mb-6 size-100" />
      <p className="mb-4 font-base text-center text-lg">
        {message || "Page not found"}
      </p>
      <Link
        to="/"
        className="bg-Primary px-6 py-2 rounded-lg w-auto text-center text-sm text-white"
      >
        &larr; Back to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
