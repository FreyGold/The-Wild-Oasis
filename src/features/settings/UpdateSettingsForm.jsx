import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getSettings } from "../../services/apiSettings";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
   const {
      isLoading,
      data: settings,
      error,
   } = useQuery({
      queryKey: ["settings"],
      queryFn: getSettings,
   });

   const { register, handleSubmit, reset, getValues, formState } = useForm();
   const { isEditing, updateSetting } = useEditSettings();
   if (isLoading) return <Spinner />;

   const {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
   } = settings;

   function onSubmit(editedSettings) {
      console.log(settings);
      console.log("-----");
      console.log(editedSettings);
      updateSetting(editedSettings);
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow label="Minimum nights/booking">
            <Input
               type="number"
               id="min-nights"
               disabled={isEditing}
               {...register("minBookingLength", {
                  required: "You must provide min nights",
               })}
            />
         </FormRow>
         <FormRow label="Maximum nights/booking">
            <Input
               type="number"
               id="max-nights"
               disabled={isEditing}
               {...register("maxBookingLength", {
                  required: "You must provide max nights",
               })}
            />
         </FormRow>
         <FormRow label="Maximum guests/booking">
            <Input
               type="number"
               id="max-guests"
               disabled={isEditing}
               {...register("maxGuestsPerBooking", {
                  required: "You must provide max guests",
               })}
            />
         </FormRow>
         <FormRow label="Breakfast price">
            <Input
               type="number"
               id="breakfast-price"
               disabled={isEditing}
               {...register("breakfastPrice", {
                  required: "You must provide breakfast price",
               })}
            />
         </FormRow>
         <FormRow>
            <Button>Edit</Button>
         </FormRow>
      </Form>
   );
}

export default UpdateSettingsForm;
