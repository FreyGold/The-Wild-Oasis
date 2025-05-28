import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";

const TableRow = styled.div`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 2.4rem;
   align-items: center;
   padding: 1.4rem 2.4rem;

   &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
   }
`;

const Img = styled.img`
   display: block;
   width: 6.4rem;
   aspect-ratio: 3 / 2;
   object-fit: cover;
   object-position: center;
   transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: "Sono";
`;

const Price = styled.div`
   font-family: "Sono";
   font-weight: 600;
`;

const Discount = styled.div`
   font-family: "Sono";
   font-weight: 500;
   color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
   const [openForm, setOpenForm] = useState(false);
   const {
      id: cabinId,
      name,
      maxCapacity,
      image,
      regularPrice,
      discount,
   } = cabin;
   const { isDeleting, deleteCabin } = useDeleteCabin();
   const { isDuplicating, duplicateCabin } = useDuplicateCabin();
   return (
      <>
         <TableRow role="row">
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount > 0 ? (
               <Discount>{formatCurrency(discount)}</Discount>
            ) : (
               <span>&mdash;</span>
            )}
            <div
               style={{ display: "flex", gap: "3px", boxSizing: "border-box" }}>
               <Button
                  disabled={isDuplicating}
                  onClick={() => duplicateCabin(cabinId)}>
                  <HiSquare2Stack />
               </Button>

               <Modal>
                  <Modal.OpenModal opens="cabin-edit">
                     <Button>
                        <HiPencil />
                     </Button>
                  </Modal.OpenModal>
                  <Modal.Window name="cabin-edit">
                     <CreateCabinForm />
                  </Modal.Window>
               </Modal>

               {/* <Button onClick={() => setOpenForm((openForm) => !openForm)}>
                  <HiPencil />
               </Button> */}

               <Modal>
                  <Modal.OpenModal opens="cabin-delete">
                     <Button variation="danger">
                        <HiTrash />
                     </Button>
                  </Modal.OpenModal>
                  <Modal.Window name="cabin-delete">
                     <Row>
                        <div>Are you sure you want to delete this cabin?</div>
                        <Button
                           variation="danger"
                           onClick={() => deleteCabin(cabinId)}
                           disabled={isDeleting}>
                           Yes
                        </Button>
                     </Row>
                  </Modal.Window>
               </Modal>

               {/* <Button
                  variation="danger"
                  onClick={() => deleteCabin(cabinId)}
                  disabled={isDeleting}>
                  <HiTrash />
               </Button> */}
            </div>
         </TableRow>
         {openForm && <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>}
      </>
   );
}

export default CabinRow;
