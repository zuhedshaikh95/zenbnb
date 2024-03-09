import { useFavorite } from "@/hooks";
import { User } from "@/types";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  listingId: string;
  user?: User | null;
}

const LikeButton: React.FC<Props> = ({ listingId, user }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, user });

  return (
    <div className="relative hover:opacity-100 transition cursor-pointer" onClick={toggleFavorite}>
      <AiOutlineHeart className="fill-white absolute" size={25} />

      <AiFillHeart className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`} size={25} />
    </div>
  );
};

export default LikeButton;
