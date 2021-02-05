import React, { Component } from "react";
import DvdService from "../../Services/DvdServices";
import { Tag, Card } from 'antd';
import './DvdCard.scss';


export default class DvdCard extends Component {
    constructor(props) {
        super(props);
        this.retrieveDvds = this.retrieveDvds.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDvd = this.setActiveDvd.bind(this);

        this.state = {
            Dvds: [],
            currentDvd: {
                id: null,
                title: "",
                description: "",
                img_url: "",
                category: "",
                status: 0,
            },
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveDvds();
    }


    retrieveDvds() {
        // Call API to Retrieve all dvds
        DvdService.retrieveAll()
            .then((response) => {
                const data = response.data;
                this.setState({
                    Dvds: data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    refreshList() {
        this.retrieveDvds()
        this.setState({
            currentDvd: null,
            currentIndex: -1,
        });
    }

    setActiveDvd(Dvd, index) {
        this.setState({
            currentDvd: Dvd,
            currentIndex: index,
        });
    }

    getDvd(id) {
        // TCall API to Get a dvd by id
        DvdService.retrieveById(id)
            .then((response) => {
                const data = response.data;
                this.setState({
                    currentDvd: data,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteDvd() {
        // Call API to delete dvd
        DvdService.delete(this.state.currentDvd.id)
            .then((response) => {
                alert("data deleted")
                this.refreshList()
            })
            .catch((error) => {
                this.setState({
                    message: "Error when deleting data" + error,
                })
            })
    }

    render() {
        const { Dvds } = this.state;
        return (
            <div>
                {Dvds &&
                    Dvds.map((Dvd, index) => (
                        <div className="column" key={index}>
                            <div className="card-dvd" >
                                <Card>
                                    <img src={Dvd.img_url} alt="Cover" style={{ width: '30vw', height: '35vh' }} />
                                    <div className="container">
                                        <h4><b>{Dvd.title}</b></h4>
                                        <p>{Dvd.description}</p>
                                        <Tag color="magenta">{Dvd.category}</Tag>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }
}


