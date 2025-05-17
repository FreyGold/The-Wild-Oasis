import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(reset) {
   const queryClient = useQueryClient();
   const { isLoading: isAdding, mutate: addCabin } = useMutation({
      mutationFn: addEditCabin,
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["cabin"],
         });
         toast.success(`Cabin has been successfully added`);
         reset();
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });
   return { isAdding, addCabin };
}
