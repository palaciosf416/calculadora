import styled from 'styled-components';

const Boton = ({ texto, clase, handleClick }) => {
  return <StyledButton className={clase} onClick={handleClick}>{texto}</StyledButton>;
};

const StyledButton = styled.button`
  border: none;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.terciario};
  font-size: 5rem;
  aspect-ratio: .5 / .5;
  color: ${(props) => props.theme.text2};

  &:active {
    transform: scale(1.02);
  }

  &.gris {
    background-color: ${(props) => props.theme.secundario};
    color: ${(props) => props.theme.text2};
  }

  &.operacion {
    background-color: ${(props) => props.theme.primario};
    color: ${(props) => props.theme.text1};
  }
`;

export default Boton;