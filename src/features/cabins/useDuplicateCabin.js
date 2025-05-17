import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin as duplicateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDuplicateCabin() {
   const queryClient = useQueryClient();
   const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
      mutationFn: duplicateCabinApi,
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["cabin"],
         });
         toast.success(`Cabin has been successfully added`);
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });
   return { isDuplicating, duplicateCabin };
}
