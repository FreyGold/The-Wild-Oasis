import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const onClose = () => {
      setIsOpenModal(!isOpenModal);
   };
   return (
      <div>
         <Button onClick={() => setIsOpenModal((show) => !show)} size="large">
            {isOpenModal ? "Close" : "Add new Cabin"}
         </Button>
         {isOpenModal && (
            <Modal onClose={onClose}>
               <CreateCabinForm onClose={onClose} />
            </Modal>
         )}
      </div>
   );
}

export default AddCabin;
