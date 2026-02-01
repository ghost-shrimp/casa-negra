import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getArt } from "../api/get-art";

export const useArtList = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get('type') || undefined;
  const sort = searchParams.get('sort') as 'asc' | 'desc' | 'newest' || 'newest';

  const minPrice = searchParams.get('minPrice')
    ? Number(searchParams.get('minPrice'))
    : undefined;
  const maxPrice = searchParams.get('maxPrice')
    ? Number(searchParams.get('maxPrice'))
    : undefined;

  return useQuery({
    queryKey: ['artworks', { type, sort, minPrice, maxPrice }],
    queryFn: () => getArt({
      type,
      sortOrder: sort,
      minPrice,
      maxPrice
    }),
    staleTime: 1000 * 60 * 5,
  });
};