import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
   return (
      <Modal>
         <Modal.OpenModal opens="cabin-form">
            <Button>Add new cabin</Button>
         </Modal.OpenModal>
         <Modal.Window name="cabin-form">
            <CreateCabinForm />
         </Modal.Window>

         <Modal.OpenModal opens="cabin-table">
            <Button>Open Cabin Table</Button>
         </Modal.OpenModal>
         <Modal.Window name="cabin-table">
            <CabinTable />
         </Modal.Window>
      </Modal>
   );
}

export default AddCabin;

// const [isOpenModal, setIsOpenModal] = useState(false);
// const onClose = () => {
//    setIsOpenModal(!isOpenModal);
// };
// return (
//    <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)} size="large">
//          {isOpenModal ? "Close" : "Add new Cabin"}
//       </Button>
//       {isOpenModal && (
//          <Modal onClose={onClose}>
//             <CreateCabinForm onClose={onClose} />
//          </Modal>
//       )}
//    </div>
// );
