import { DateTimePicker } from "@mui/x-date-pickers";
import styled from "styled-components";

export const FormDateTimePicker = styled(DateTimePicker)`
  & .MuiInputBase-root {
    margin-left: 10px;
    & input {
      padding: 5px !important;
    }
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    & .MuiInputBase-root {
      margin-left: 0px;
      margin-top: 5px;
    }
  }
`;
