import './App.css';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main';
import DogDetails from './components/DogDetails';
import Home from './components/Home';
import CreateDog from './components/CreateDog';

function App() {


  return (
    <div className="App">

      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/main' exact>
          <Main />
        </Route>

        <Route path='/create' exact>
          <CreateDog />
        </Route>

        <Route path='/:id'>
          <DogDetails />
        </Route>



      </Switch>

    </div>
  );
}

export default App;
