import { Card } from "@mui/material";
import styled from "styled-components";

export const FormConatiner = styled(Card)`
  min-width: 300px;
  max-width: 600px;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (max-width:576px) {
  margin: 300px 0;
}
`;
