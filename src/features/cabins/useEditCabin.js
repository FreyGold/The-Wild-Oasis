import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
   const queryClient = useQueryClient();
   const { isLoading: isEditing, mutate: editCabin } = useMutation({
      mutationFn: ({ newFormData, id }) => addEditCabin(newFormData, id),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["cabin"],
         });
         toast.success(`Cabin has been successfully edited}`);
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });
}
