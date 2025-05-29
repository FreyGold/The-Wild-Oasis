import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
   const {
      isLoading,
      data: cabins,
      error,
   } = useQuery({
      queryKey: ["cabin"],
      queryFn: getCabins,
   });

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
               data={cabins}
               render={(cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin}></CabinRow>
               )}
            />
         </Table>
      </Menus>
   );
}

export default CabinTable;
