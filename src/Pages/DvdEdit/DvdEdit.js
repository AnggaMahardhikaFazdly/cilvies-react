import React, { Component } from "react";
import './DvdEdit.scss';
import DvdService from "../../Services/DvdServices";
import { Card } from 'antd';
import { Gap, Input, Button, Link } from "../../Components";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"

export default class DVd extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImgUrl = this.onChangeImgUrl.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        // this.onChangeStatus = this.onChangeStatus.bind(this);

        this.getDvd = this.getDvd.bind(this);
        this.updateDvd = this.updateDvd.bind(this);
        this.deleteDvd = this.deleteDvd.bind(this);
        this.toggleButton = this.toggleButton.bind(this)
        // this.handleChange = this.handleChange.bind(this);

        this.state = {
            currentDvd: {
                id: null,
                title: "",
                description: "",
                img_url: "",
                category: "",
                status: false,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getDvd(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDvd: {
                    ...prevState.currentDvd,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                description: description,
            },
        }));
    }

    onChangeImgUrl(e) {
        const img_url = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                img: img_url,
            },
        }));
    }

    onChangeCategory(e) {
        const category = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                category: category,
            },
        }));
    }

    toggleButton(e) {
        this.setState({
            currentDvd: {
                ...this.state.currentDvd,
                status: !this.state.currentDvd.status
            },
        });
    }

    getDvd(id) {
        // Call API to Get a dvd by id
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

    updateDvd() {
        // Call API to Update dvd
        DvdService.update(this.state.currentDvd.id, {
            title: this.state.currentDvd.title,
            description: this.state.currentDvd.description,
            img_url: this.state.currentDvd.img_url,
            category: this.state.currentDvd.category,
            status: this.state.currentDvd.status,
        })
            .then((response) => {
                this.setState({
                    message: "Data updated successfully",
                });
                alert(this.state.message)
            })
            .catch((error) => {
                this.setState({
                    message: "Error when updating data"
                });
                alert(this.state.message)
            })
    }

    deleteDvd() {
        // Call API to delete dvd
        DvdService.delete(this.state.currentDvd.id)
            .then((response) => {
                this.props.history.getDvd();
            })
            .catch((error) => {
                this.setState({
                    message: "Error when deleting data" + error,
                })
            })
    }

    render() {
        const { currentDvd } = this.state;

        return (

            <div className="site-card-border-less-wrapper">
                <Card className="card-edit" title="ADD DVD" style={{ width: '30vw' }}>
                    <div>
                        <p className="title-input">Title</p>
                        <Input className="input" id="title" value={currentDvd.title} onChange={this.onChangeTitle} />
                    </div>
                    <Gap height={10} />
                    <div>
                        <p className="title-input">Description</p>
                        <Input className="input" id="description" value={currentDvd.description} onChange={this.onChangeDescription} />
                    </div>
                    <Gap height={10} />
                    <div>
                        <p className="title-input">Image</p>
                        <Input className="input" id="image_url" value={currentDvd.img_url} onChange={this.onChangeImgUrl} />
                    </div>
                    <Gap height={10} />
                    <div>
                        <p className="title-input">Category</p>
                        <Input className="input" id="category" value={currentDvd.category} onChange={this.onChangeCategory} />
                    </div>
                    <Gap height={10} />
                    <div>
                        <p className="title-input">Status</p>
                        <button className="toggle-status" value={currentDvd.status} onClick={this.toggleButton}>{currentDvd.status ? <FaToggleOn size="2.5rem" color="blue" /> : <FaToggleOff size="2.5rem" />}</button>
                        <p><span>{currentDvd.status ? "available" : "not available"}</span></p>
                    </div>
                    <div>
                        <Link className="link" title="Back" onClick={() => this.props.history.goBack()} />
                        <Button className="button" title="Submit" onClick={(this.updateDvd)} />
                    </div>
                </Card>
            </div>
        );
    }
}
