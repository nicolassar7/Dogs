import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './page/Landing/Landing'
import Home from './page/Home/Home'
import Detail from "./page/Detail/Detail"
import CreateDog from './components/Form/Form';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch >
          <Route exact path= '/' component={Landing} />
          <Route exact path= '/home' component={Home} />\
          <Route exact path= '/detail/:id' component={Detail} />
          <Route exact path= '/createDog' component={CreateDog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
