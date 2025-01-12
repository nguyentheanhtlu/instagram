import React from "react";
import { Link } from "react-router-dom";

const SearchUserItem = ({ id, username, name, profile_picture }) => {
  return (
    <Link
      to={`/${username}`}
      className="flex items-center hover:bg-gray-50 py-2 px-4 cursor-pointer"
    >
      <div className="flex space-x-3 items-center">
        <img
          className="w-11 h-11 rounded-full object-cover"
          src={`http://localhost:8080${profile_picture}`}
          alt="avatar"
        />
        <div className="flex flex-col items-start">
          <span className="text-black text-sm font-semibold">{username}</span>
          <span className="text-gray-400 text-sm">{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchUserItem;
