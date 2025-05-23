import styled, { css } from "styled-components";

const Row = styled.div`
   ${(props) =>
      props.type === "horizontal" &&
      css`
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
      `}
   ${(props) =>
      props.type === "vertical" &&
      css`
         flex-direction: column;
         gap: 1.6rem;
      `}
   display: flex;
`;

Row.defaultProps = {
   type: "vertical",
};

export default Row;
