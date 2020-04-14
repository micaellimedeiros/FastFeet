import styled from 'styled-components';
import Modal from 'react-modal';

const TableDetails = styled(Modal)`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 25px;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 2;
`;

export default TableDetails;
