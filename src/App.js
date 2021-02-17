import React from 'react'
import { Route, Link, BrowserRouter, Redirect } from "react-router-dom"
import './App.css'
import People from "./components/people"
import Planets from "./components/planets"
import Starships from "./components/starships"
import Species from "./components/species"
import Vehicles from "./components/vehicles"
import Films from "./components/films"
class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div className="main">
          <div className="menu">
            <div><Link to="/people" className="btn btn-primary btnW">People</Link></div>
            <div><Link to="/planets" className="btn btn-primary btnW">Planets</Link></div>
            <div><Link to="/starships" className="btn btn-primary btnW">Starships</Link></div>
            <div><Link to="/species" className="btn btn-primary btnW">Species</Link></div>
            <div><Link to="/vehicles" className="btn btn-primary btnW">Vehicles</Link></div>
            <div><Link to="/films" className="btn btn-primary btnW">Films</Link></div>
          </div>

          <div className="content">
            <div><Route path="/people" component={People}></Route></div>
            <div><Route path="/planets" component={Planets}></Route></div>
            <div><Route path="/starships" component={Starships}></Route></div>
            <div><Route path="/species" component={Species}></Route></div>
            <div><Route path="/vehicles" component={Vehicles}></Route></div>
            <div><Route path="/films" component={Films}></Route></div>
            {/* <Redirect from="/" to="/people" /> */}
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;