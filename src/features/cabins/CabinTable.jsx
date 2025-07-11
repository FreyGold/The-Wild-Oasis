import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
   const {
      isLoading,
      data: cabins,
      error,
   } = useQuery({
      queryKey: ["cabin"],
      queryFn: getCabins,
   });
   console.log(cabins);
   // filter
   const [searchParams] = useSearchParams();
   const filterValue = searchParams.get("discount") || "all";
   let filteredCabins;
   if (filterValue == "all") filteredCabins = cabins;
   if (filterValue == "no-discount") {
      filteredCabins = cabins.filter((cabin) => cabin.discount <= 0);
   }
   if (filterValue == "with-discount") {
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
   }
   // sort
   if (isLoading) return <Spinner />;

   const sortBy = searchParams.get("sortBy") || "startDate-asc";
   const [field, direction] = sortBy.split("-");
   const modifier = direction === "asc" ? 1 : -1;
   const sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
   );

   if (isLoading) return <Spinner />;
   return (
      <Menus>
         <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header role="row">
               <div></div>
               <div>Cabin</div>
               <div>Capacity</div>
               <div>Price</div>
               <div>Discount</div>
               <div></div>
            </Table.Header>
            <Table.Body
               data={sortedCabins}
               render={(cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin}></CabinRow>
               )}
            />
         </Table>
      </Menus>
   );
}

export default CabinTable;
