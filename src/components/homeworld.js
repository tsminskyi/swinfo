import React from "react"
import '../App.css'
import axios from "axios";

class Homeworld extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            homeworld: null
        }
    }
    componentDidMount() {

        if (this.props.homeworld !== null) {
            const url = this.props.homeworld.replace(/http/, "https");
            axios.get(url).then((respons) => {

                this.setState({
                    homeworld: respons.data.name
                });

            })
        }


    }



    render() {
        if (this.state.homeworld == null) {
            return (
                <td>-</td>
            )
        } else {
            return (
                <td>{this.state.homeworld}</td>
            )
        }

    }
}
export default Homeworld;