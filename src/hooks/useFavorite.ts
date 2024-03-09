import { User } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useLoginModal } from ".";

interface UseFavoriteI {
  listingId: string;
  user?: User | null;
}

const useFavorite = ({ listingId, user }: UseFavoriteI) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!user) {
        loginModal.onOpen();
        return;
      }

      let response: AxiosResponse;
      try {
        if (hasFavorited) {
          response = await axios.delete(`/api/favorites/${listingId}`);
        } else {
          response = await axios.post(`/api/favorites/${listingId}`);
        }

        router.refresh();
        toast.success(response.data.message);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          return;
        }
        toast.error(error.message);
      }
    },
    [user, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
