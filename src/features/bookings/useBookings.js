import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
   const [searchParams, setSearchParams] = useSearchParams();
   const filter = searchParams.get("status");
   const sort = searchParams.get("sortBy");
   const {
      isLoading,
      data: bookings,
      error,
   } = useQuery({
      queryKey: ["booking", filter, sort],
      queryFn: () => getBookings(filter, sort),
   });
   return { isLoading, data: bookings, error };
}
