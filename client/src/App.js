import './App.css';
import Dogs from './components/dogs';
import FilterRazas from './components/filterRazas';

import Order from './components/order';
import SearchBar from './components/serachbar';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Order />
      <FilterRazas />
      <Dogs />
    </div>
  );
}

export default App;
