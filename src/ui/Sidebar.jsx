import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledAside = styled.header`
   background-color: var(--color-grey-0);
   padding: 3.2rem 2.4rem;
   border-right: 1px solid var(--color-grey-100);
   display: flex;
   flex-direction: column;
   gap: 3.2rem;
`;
function Sidebar() {
   return (
      <StyledAside>
         <Logo />
         <MainNav />
         {/* <Uploader /> */}
      </StyledAside>
   );
}

export default Sidebar;
