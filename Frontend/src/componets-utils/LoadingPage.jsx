import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function LoadingPage({ message }) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center w-max">
        <div class="w-[15rem] loader"></div>
        <div class="flex flex-col items-center font-extrabold text-[4rem] text-Primary">
          <p>{message || "Loading..."}</p>
          <p className="flex space-x-5 text-base">
            <p>🙁 Tired of Waiting</p>
            <Link className="flex text-Primary hover:text-P2 underline" to="/">
              {" "}
              <ArrowLeft /> Go Back Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
