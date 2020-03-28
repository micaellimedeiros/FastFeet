import styled from 'styled-components';
import { Form } from '@unform/web';

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;

  section {
    background: #fff;
    padding: 30px;
    border-radius: 4px;
  }
`;

export default FormContainer;
