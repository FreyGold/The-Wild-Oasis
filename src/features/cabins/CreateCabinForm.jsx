import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
   const { id: editId, ...editValues } = cabinToEdit;
   const isEditSession = Boolean(editId);
   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   });
   const { errors } = formState;
   const { isAdding, addCabin } = useCreateCabin(reset);
   const { isEditing, editCabin } = useEditCabin();
   const isWorking = isAdding || isEditing;
   function onSubmit(data) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      if (isEditSession)
         editCabin({
            newFormData: { ...data, id: editId, image: image },
            id: editId,
         });
      else addCabin({ ...data, image: image });
   }
   function onError() {
      console.log(errors);
   }
   return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
         <FormRow label="Cabin Name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isWorking}
               {...register("name", {
                  required: "You must provide a name for the cabin",
               })}
            />
         </FormRow>

         <FormRow label="Max Capacity" error={errors.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isWorking}
               {...register("maxCapacity", {
                  required: "You must provide a capacity for the cabin",
                  min: {
                     value: 1,
                     message: "must be at least 1",
                  },
               })}
            />
         </FormRow>

         <FormRow label="Regular Price" error={errors.regularPrice?.message}>
            <Input
               type="number"
               id="regularPrice"
               disabled={isWorking}
               {...register("regularPrice", {
                  required: "You must provide a price for the cabin",
                  min: {
                     value: 1,
                     message: "must be at least 1",
                  },
               })}
            />
         </FormRow>

         <FormRow label="Discount" error={errors.discount?.message}>
            <Input
               type="number"
               id="discount"
               defaultValue={0}
               disabled={isWorking}
               {...register("discount", {
                  required: "You must provide a discount for the cabin",
                  validate: (value) =>
                     value <= getValues().regularPrice ||
                     "Discount should be smaller than the actual price",
               })}
            />
         </FormRow>

         <FormRow label="Description" error={errors.description?.message}>
            <Textarea
               type="number"
               id="description"
               disabled={isWorking}
               defaultValue=""
               {...register("description", {
                  required: "You must provide a description for the cabin",
               })}
            />
         </FormRow>

         <FormRow label="Cabin photo" error={errors.image?.message}>
            <FileInput
               id="image"
               accept="image/*"
               {...register("image", {
                  required: isEditSession
                     ? false
                     : "You must provide an image for the cabin",
               })}
            />
         </FormRow>

         <FormRow>
            <Button variation="secondary" type="reset">
               Cancel
            </Button>
            <Button disabled={isWorking}>
               {isEditSession ? "Edit Cabin" : "Add Cabin"}
            </Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
