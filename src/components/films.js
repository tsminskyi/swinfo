import "../App.css";
import React from "react";
import axios from "axios";

class Films extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: null,
            next: null,
            previous: null,
        };
        this.BASE_URL = "https://swapi.dev/api/films/"

    }
    componentDidMount() {
        axios.get(this.BASE_URL).then((respons) => {
            this.setState({
                films: respons.data.results,
                next: respons.data.next,
                previous: respons.data.previous,
                count: respons.data.count,
            });
        });
    }


    searchByName() {

        let data = document.querySelector("input[type='search']").value;
        axios
            .get(`${this.BASE_URL}?search=${data}`)
            .then((respons) => {
                this.setState({
                    films: respons.data.results,
                    next: respons.data.next,
                    previous: respons.data.previous,
                    count: respons.data.count,
                    item:0
                });
            });
    }



    render() {
        if (this.state.films == null) {
            return <div>LOADING....</div>;
        } else {
            return (
                <div>
                    <input type="search" placeholder="search by title" />
                    <input
                        type="button"
                        value="Search"
                        onClick={() => this.searchByName()}
                    />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="2">Title </th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.films.map((respons, id) => {
                                ++id;
                                return (
                                    <tr key={id}>
                                        <td colSpan="2">
                                            <div>Episode:{respons.episode_id} {respons.title}</div>
                                            <div>{respons.producer}</div>
                                            <div>{respons.director}</div>
                                            <div>{respons.created}</div>
                                            <div>{respons.release_date}</div>
                                        </td>
                                        <td>{respons.opening_crawl}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
export default Films;