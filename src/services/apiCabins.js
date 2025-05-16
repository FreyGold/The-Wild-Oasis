import supabase from "./supabase";

export async function getCabins() {
   const { data, error } = await supabase.from("cabins").select("*");
   if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
   }
   return data;
}

export async function deleteCabin(id) {
   const { error } = await supabase.from("cabins").delete().eq("id", id);
   if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted");
   }
   console.log("deleted");
   return 0;
}

export async function addCabin(formData) {
   const { data, error } = await supabase
      .from("cabins")
      .insert([
         {
            name: formData.name,
            maxCapacity: formData.maxCapacity,
            regularPrice: formData.regularPrice,
            discount: formData.discount,
            description: formData.description,
         },
      ])
      .select();
   if (error) {
      console.error(error);
      throw new Error("Cabin could not be added");
   }
   console.log("added cabin", data);
   return 0;
}
