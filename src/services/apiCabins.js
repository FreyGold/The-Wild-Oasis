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

export async function addEditCabin(formData, id = null) {
   const hasImagePath = formData.image?.startsWith?.("https:");
   const newImage = `${Math.random()}-${formData.image.name}`.replace("/", "");
   const imagePath = hasImagePath
      ? formData.image
      : `https://zwnpinbeyaqhrmbeghcw.supabase.co/storage/v1/object/public/cabin-images/${newImage}`;
   let query = supabase.from("cabins");

   if (!id) {
      query = query.insert([
         {
            ...formData,
            image: imagePath,
         },
      ]);
   } else {
      query = query.update({ ...formData, image: imagePath }).eq("id", id);
   }
   const { data, error } = await query.select().single();

   if (error) {
      console.error(error);
      throw new Error(`Cabin could not be ${id ? "edited" : "created"}`);
   }

   if (!hasImagePath) {
      console.log(formData);
      const { error: storageError } = await supabase.storage
         .from("cabin-images")
         .upload(newImage, formData.image);
      if (storageError) {
         console.error(storageError);
         await supabase.from("cabins").delete().eq("id", data.id);
         throw new Error("image could not be uploaded");
      } else {
         console.log("uploaded image to bucket");
      }
   }

   console.log(`${id ? "edited" : "created"} cabin`, data);
   return 0;
}
export async function duplicateCabin(id) {
   let query = supabase.from("cabins");

   const { data: cabin, error: selectError } = await query
      .select("*")
      .eq("id", id)
      .single();

   if (selectError) {
      console.error(selectError);
      throw new Error(`Cabin could not be duplicate`);
   }

   const { id: _, ...cabinWithoutId } = cabin;
   const { data, error } = await query
      .insert([
         {
            ...cabinWithoutId,
         },
      ])
      .select();

   if (error) {
      console.error(error);
      throw new Error(`Cabin could not be duplicate`);
   }

   console.log(`duplicated cabin`, data);
   return 0;
}
