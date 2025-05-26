import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSettings() {
   const queryClient = useQueryClient();
   const { isLoading: isEditing, mutate: updateSetting } = useMutation({
      mutationFn: (editedSettings) => updateSettingApi(editedSettings),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["settings"],
         });
         toast.success(`Settings have been successfully edited`);
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });
   return { isEditing, updateSetting };
}
