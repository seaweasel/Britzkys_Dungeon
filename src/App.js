import Races from './views/Races'
import SignIn from './views/SignIn';
import SignUp  from './views/SignUp';
import { Classes } from './views/Classes';
import { ViewCharacters } from './views/ViewCharacters';
import { Home } from './views/Home'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import { ResponsiveAppBar } from './views/ResponsiveAppBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewCharacter } from './views/NewCharacter';
import { CharacterProvider } from './context/CharacterContext';
import { Backgrounds } from './views/Backgrounds';
import { AbilityScores } from './views/AbilityScores';
import AlignmentTable from './views/AlignmentTable'; 
import combinedTheme from './theme/theme';
import { UpdateCharacter } from './views/UpdateCharacter';




function App() {

  return (
    <>
    <ThemeProvider theme={combinedTheme}>
      <AuthProvider>
        <CharacterProvider>
          <BrowserRouter>
            <CssBaseline />
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/newcharacter" element={<NewCharacter />} />
                <Route path="/viewcharacters" element={<ViewCharacters />} />
                <Route path="/logout" element={<SignIn />} />
                <Route path="/races" element={<Races />}  />
                <Route path="/classes" element={<Classes />}  />
                <Route path="/alignmenttable" element={<AlignmentTable />} />
                <Route path="/abilityscores" element={<AbilityScores />} />
                <Route path="/backgrounds" element={<Backgrounds />} />
                <Route path="/updatecharacter" element={<UpdateCharacter />} />
            </Routes>
          </BrowserRouter>
        </CharacterProvider>
      </AuthProvider>  
    </ThemeProvider>
  </>
);
}

export default App;
