import React from "react";
import "../App.css";
import axios from "axios";

class Planets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: null,
      next: null,
      previous: null,
      item: null,
    };
    this.BASE_URL = "https://swapi.dev/api/planets/"
  }

  componentDidMount() {
    axios.get(this.BASE_URL).then((respons) => {
      this.setState({
        planet: respons.data.results,
        next: respons.data.next,
        previous: respons.data.previous
      });
      this.setStartNumber();
    });

  }

  loadPage(url) {
    if (url !== null) {
      axios.get(url).then((respons) => {
        this.setState({
          planet: respons.data.results,
          next: respons.data.next,
          previous: respons.data.previous,
        });

        this.setStartNumber();
      });
    }
  }

  setStartNumber() {
    // гореть в аду всем кто научил js конкатенировать числа как строки
    let temp = null;
    if (this.state.next !== null) {
      temp =
        (Number(this.state.next.match(/[0-9]+(?!.*[0-9])/g)[0]) - 1) * 10 - 10;
    } else {
      temp = (Number(this.state.previous.match(/[0-9]+/g)[0]) + 1) * 10 - 10;
    }
    this.setState({
      item: temp,
    });
  }

  searchByName() {

    let data = document.querySelector("input[type='search']").value;
    axios
      .get(`${this.BASE_URL}?search=${data}`)
      .then((respons) => {
        this.setState({
          planet: respons.data.results,
          next: respons.data.next,
          previous: respons.data.previous,
          count: respons.data.count,
          item:0
        });
      });
  }

  render() {
    if (this.state.planet == null) {
      return <div>LOADING....</div>;
    } else {
      return (
        <div>
          <input type="search" placeholder="search by name" />
          <input
            type="button"
            value="Search"
            onClick={() => this.searchByName()}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Climate</th>
                <th scope="col">Diameter</th>
                <th scope="col">Population</th>
                <th scope="col">Orbital period</th>
                <th scope="col">Rotation period</th>
                <th scope="col">Terrain</th>
              </tr>
            </thead>
            <tbody>
              {this.state.planet.map((respons, id) => {
                ++id;
                return (
                  <tr key={id}>
                    <td>{Number(id) + Number(this.state.item)}</td>
                    <td>{respons.name}</td>
                    <td>{respons.climate}</td>
                    <td>{respons.diameter}</td>
                    <td>{respons.population}</td>
                    <td>{respons.orbital_period}</td>
                    <td>{respons.rotation_period}</td>
                    <td>{respons.terrain}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <input
            type="button"
            value="BACK"
            onClick={() => this.loadPage(this.state.previous)}
          />
          <input
            type="button"
            value="NEXT"
            onClick={() => this.loadPage(this.state.next)}
          />
        </div>
      );
    }
  }
}
export default Planets;
