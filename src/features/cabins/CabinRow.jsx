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
   console.log(cabin);
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
                  <CreateCabinForm cabinToEdit={cabin} />
               </Modal.Window>
            </Modal>
            <Modal>
               <Modal.OpenModal opens="cabin-delete">
                  <Button variation="danger">
                     <HiTrash />
                  </Button>
               </Modal.OpenModal>
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
