import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

const StyledToggle = styled.button`
   background: none;
   border: none;
   padding: 0.4rem;
   border-radius: var(--border-radius-sm);
   transform: translateX(0.8rem);
   transition: all 0.2s;

   &:hover {
      background-color: var(--color-grey-100);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-700);
   }
`;

const StyledList = styled.ul`
   position: fixed;

   background-color: var(--color-grey-0);
   box-shadow: var(--shadow-md);
   border-radius: var(--border-radius-md);

   right: ${(props) => props.position.x}px;
   top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
   width: 100%;
   text-align: left;
   background: none;
   border: none;
   padding: 1.2rem 2.4rem;
   font-size: 1.4rem;
   transition: all 0.2s;

   display: flex;
   align-items: center;
   gap: 1.6rem;

   &:hover {
      background-color: var(--color-grey-50);
   }

   & svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
   }
`;
const MenusContext = createContext();

function Menus({ children }) {
   const [openId, setOpenId] = useState("");
   const [position, setPosition] = useState({});

   const close = () => {
      setOpenId("");
   };
   const open = setOpenId;
   return (
      <MenusContext.Provider
         value={{ openId, close, open, setPosition, position }}>
         {children}
      </MenusContext.Provider>
   );
}

function Toggle({ id }) {
   const { open, close, openId, setPosition } = useContext(MenusContext);
   const handleClick = (e) => {
      const rect = e.target.closest("button").getBoundingClientRect();

      setPosition({
         x: window.innerWidth - rect.width - rect.x,
         y: rect.y + rect.height + 8,
      });
      if (openId === "" || openId != id) {
         open(id);
      } else {
         close();
      }
   };
   return (
      <StyledToggle onClick={handleClick}>
         <HiEllipsisVertical />
      </StyledToggle>
   );
}
function List({ id, children }) {
   const { openId, position, close } = useContext(MenusContext);
   const { x, y } = position;
   const { ref } = useOutsideClick(close);

   if (openId != id) return null;
   return createPortal(
      <StyledList position={{ x: x, y: y }} ref={ref}>
         {children}
      </StyledList>,
      document.body
   );
}
function Button({ children, icon, onClick }) {
   const { close } = useContext(MenusContext);
   const handleClick = () => {
      onClick?.();
      close();
   };
   return (
      <li>
         <StyledButton onClick={handleClick}>
            {icon}
            <span>{children}</span>
         </StyledButton>
      </li>
   );
}

Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;
Menus.Menu = Menu;
export default Menus;
