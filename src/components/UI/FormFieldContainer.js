import styled from "styled-components";

export const FormFieldContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin: 10px 0;
align-items: center;
@media screen and (max-width:576px) {
    flex-direction: column;
    align-items: start;
}
`