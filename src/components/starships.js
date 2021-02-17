import "../App.css";
import React from "react";
import axios from "axios";

class Starships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: null,
            next: null,
            previous: null,
            count: null,
            item: null
        };
        this.BASE_URL = "https://swapi.dev/api/starships/";

    }
    componentDidMount() {
        axios.get(this.BASE_URL).then((respons) => {
            this.setState({
                starships: respons.data.results,
                next: respons.data.next,
                previous: respons.data.previous,
                count: respons.data.count,
            });
            this.setStartNumber();
        });
    }

    loadPage(url) {
        if (url !== null) {
            axios.get(url).then((respons) => {
                this.setState({
                    starships: respons.data.results,
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
                    starships: respons.data.results,
                    next: respons.data.next,
                    previous: respons.data.previous,
                    count: respons.data.count,
                    item:0
                });
            });
    }



    render() {
        if (this.state.starships == null) {
            return <div>LOADING....</div>;
        } else {
            return (
                <div>
                    <input type="search" placeholder="name or model" />
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
                                <th scope="col">MGLT</th>
                                <th scope="col">Model</th>
                                <th scope="col">Crew</th>
                                <th scope="col">Manufacturer</th>
                                <th scope="col">length</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.starships.map((respons, id) => {
                                ++id;
                                return (
                                    <tr key={id}>
                                        <td>{Number(id) + Number(this.state.item)}</td>
                                        <td>{respons.name}</td>
                                        <td>{respons.MGLT}</td>
                                        <td>{respons.model}</td>
                                        <td>{respons.crew}</td>
                                        <td>{respons.manufacturer}</td>
                                        <td>{respons.length}</td>
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
export default Starships;
