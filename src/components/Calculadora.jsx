import styled from "styled-components";
import Boton from './Boton';
import { useContext, useState } from "react";
import { ThemeContext } from "../App";

export function Calculadora() {
  const [data, setData] = useState({ operacion: '', resultado: '' });

  const { setTheme, theme } = useContext(ThemeContext);

  const CambiarTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");  // Cambiar entre "light" y "dark"
  };

  const escritura = (event) => {
    const valor = event.target.innerText;
    const esOperacion = valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '%';

    if (data.operacion.length >= 10) return;
    if (valor === '+/-' && data.operacion === '') return;
    if (valor === '%' && data.operacion.includes('%')) return;

    if (data.operacion.includes('Error')) {
      setData({ ...data, operacion: valor });
    } else if (data.resultado !== '' && data.operacion === '' && esOperacion) {
      setData({ ...data, operacion: `${data.resultado}` + valor });
    } else if (valor === '+/-' && data.operacion !== '') {
      if (data.operacion.slice(0, 1) === '-') {
        setData({ ...data, operacion: `${data.operacion.slice(1, data.operacion.length)}` });
      } else {
        setData({ ...data, operacion: `-${data.operacion}` });
      }
    } else {
      setData({ ...data, operacion: `${data.operacion}` + valor });
    }
  };

  const eliminar = () => {
    setData({ ...data, operacion: data.operacion.slice(0, data.operacion.length - 1) });
  };

  const limpiar = () => {
    setData({ operacion: '', resultado: '' });
  };

  const resultado = () => {
    try {
      let resultado = '';

      if (data.operacion.includes('%')) {
        const valores = data.operacion.split('%');
        resultado = eval(`${valores[1]}*(${valores[0]}/100)`);
      } else {
        resultado = eval(data.operacion);
      }

      setData({ ...data, resultado, operacion: '' });
    } catch (error) {
      setData({ ...data, operacion: 'Error' });
    }
  };



  return (
    <Container>
      <div className="Themecontent">
              <div className="Togglecontent">
                  <div className="grid theme-container">
                      <div className="content">
                          <div className="demo">
                              <label className="switch" istheme={theme}>
                                  <input
                                      istheme={theme}
                                      type="checkbox"
                                      className="theme-swither"
                                      onClick={CambiarTheme}
                                  ></input>
                                  <span istheme={theme} className="slider round"></span>
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      <h1>Calculadora</h1>
      <main className="main">
        <span className="resultado">{data.resultado}</span>
        <span className="display">{data.operacion}</span>
        <Boton texto='C' clase='gris' handleClick={limpiar} />
        <Boton texto='+/-' clase='gris' handleClick={escritura} />
        <Boton texto='%' clase='gris' handleClick={escritura} />
        <Boton texto='/' clase='operacion' handleClick={escritura} />
        <Boton texto='7' clase='numero' handleClick={escritura} />
        <Boton texto='8' clase='numero' handleClick={escritura} />
        <Boton texto='9' clase='numero' handleClick={escritura} />
        <Boton texto='*' clase='operacion' handleClick={escritura} />
        <Boton texto='4' clase='numero' handleClick={escritura} />
        <Boton texto='5' clase='numero' handleClick={escritura} />
        <Boton texto='6' clase='numero' handleClick={escritura} />
        <Boton texto='-' clase='operacion' handleClick={escritura} />
        <Boton texto='1' clase='numero' handleClick={escritura} />
        <Boton texto='2' clase='numero' handleClick={escritura} />
        <Boton texto='3' clase='numero' handleClick={escritura} />
        <Boton texto='+' clase='operacion' handleClick={escritura} />
        <Boton texto='.' clase='numero' handleClick={escritura} />
        <Boton texto='0' clase='numero' handleClick={escritura} />
        <Boton texto='◀' clase='numero' handleClick={eliminar} />
        <Boton texto='=' clase='operacion' handleClick={resultado} />
      </main>
      <footer>
        <p>@ 2025 Fernando Palacios</p>
      </footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw; 
  display: grid;
  place-items: center;


  .main {
    background-color: ${(props) => props.theme.fondo};
    aspect-ratio: 9/16;
    border-radius: 1rem;
    height: 90%;
    min-height: 700px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.20);
    padding: 2rem;
    padding-bottom: 3.5rem;
    padding-right: 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  span {
    grid-column: span 4;
    text-align: right;
    padding: 0 .5rem;
  }

  span.resultado {
    color: ${(props) => props.theme.bg2};
    font-size: 3rem;
    height: 3rem;
  }

  span.display {
    color: ${(props) => props.theme.bg};
    font-size: 4rem;
    height: 4rem;
  }

  .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;


    .Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 70px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;

      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;

        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }

        .demo {
          font-size: 32px;

          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;

            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;

              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
              }
            }

            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${(props) => props.theme.fondo};
              transition: 0.4s;
  

              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }

              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }

`;