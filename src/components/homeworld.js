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

        const url = this.props.homeworld

        if (url !== null) {
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