import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
      <Table.Row>
         <Img src={image} />
         <Cabin>{name}</Cabin>
         <div>Fits up to {maxCapacity} guests</div>
         <Price>{formatCurrency(regularPrice)}</Price>
         {discount > 0 ? (
            <Discount>{formatCurrency(discount)}</Discount>
         ) : (
            <span>&mdash;</span>
         )}
         <div style={{ display: "flex", gap: "3px", boxSizing: "border-box" }}>
            <Modal>
               <Menus.Menu>
                  <Menus.Toggle id={cabinId} />

                  <Menus.List id={cabinId}>
                     <Menus.Button
                        icon={<HiSquare2Stack />}
                        onClick={() => duplicateCabin(cabinId)}
                        disabled={isDuplicating}>
                        Duplicate
                     </Menus.Button>

                     <Modal.OpenModal opens="cabin-edit">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                     </Modal.OpenModal>

                     <Modal.OpenModal opens="cabin-delete">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                     </Modal.OpenModal>
                  </Menus.List>
               </Menus.Menu>
               <Modal.Window name="cabin-edit">
                  <CreateCabinForm cabinToEdit={cabin} />
               </Modal.Window>

               <Modal.Window name="cabin-delete">
                  <ConfirmDelete
                     resourceName="cabins"
                     disabled={isDeleting}
                     onConfirm={() => deleteCabin(cabinId)}
                  />
               </Modal.Window>
            </Modal>
         </div>
      </Table.Row>
   );
}

export default CabinRow;
