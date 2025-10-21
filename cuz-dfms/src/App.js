import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import StepperProgress from "../src/component/Stepper"


function App() {



  return (
  <MantineProvider>
    <StepperProgress />
    
    
  </MantineProvider>

  );
}

export default App;
