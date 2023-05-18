import SignIn from './views/SignIn';
import SignUp  from './views/SignUp';
import { ViewCharacters } from './views/ViewCharacters';
import { Home } from './views/Home'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import { ResponsiveAppBar } from './views/ResponsiveAppBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewCharacter } from './views/NewCharacter';
import { CharacterProvider } from './context/CharacterContext';
import combinedTheme from './theme/theme';
import { UpdateCharacter } from './views/UpdateCharacter';
import { Test } from './views/Test';
import { ModalProvider } from './context/ModalContext';
import { SnackbarProvider } from './context/SnackbarContext';
import CustomSnackbar from './components/CustomSnackbar';
import { CharacterSheet } from './views/CharacterSheet';




function App() {

  return (
    <>
    <ThemeProvider theme={combinedTheme}>
      <AuthProvider>
        <CharacterProvider>
          <ModalProvider>
            <SnackbarProvider>
              <BrowserRouter>
                <CssBaseline />
                <ResponsiveAppBar />
                <CustomSnackbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn/>} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/newcharacter" element={<NewCharacter />} />
                    <Route path="/viewcharacters" element={<ViewCharacters />} />
                    <Route path="/logout" element={<SignIn />} />
                    <Route path="/updatecharacter" element={<UpdateCharacter />} />
                    <Route path="/charactersheet/:characterId" element={<CharacterSheet />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
              </BrowserRouter>
            </SnackbarProvider>
          </ModalProvider>
        </CharacterProvider>
      </AuthProvider>  
    </ThemeProvider>
  </>
);
}

export default App;
