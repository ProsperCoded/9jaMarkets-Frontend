import { Link } from "react-router-dom";
import Err404 from "../assets/404.png";

function Error404() {
    return (
        <div className="bg-white flex flex-col justify-center items-center rounded-2xl py-30 shadow-md mx-6 mt-8 mb-8 p-6 pb-20">
            <img src={Err404} alt="404" className="size-100 mb-6" />
            <p className="font-thin text-lg text-center mb-4">Page not found</p>
            <Link 
                to="/" 
                className="bg-Primary text-white rounded-lg text-sm w-auto px-6 py-2 text-center"
            >
                &larr; Back to Homepage 
            </Link>
        </div>
    );
}

export default Error404;
                                                                                                                         