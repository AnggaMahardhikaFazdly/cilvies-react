import React, { Component } from "react";
import './CreateDvd.scss';
import DvdService from "../../Services/DvdServices";
import { Card } from 'antd';
import { Gap, Input, Button, Link } from "../../Components";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"


export default class CreateDvd extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImgUrl = this.onChangeImgUrl.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        // this.onChangeStatus = this.onChangeStatus.bind(this);
        this.toggleButton = this.toggleButton.bind(this)


        this.saveDvd = this.saveDvd.bind(this);
        this.newDvd = this.newDvd.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            img_url: "",
            category: "",
            status: false,
        };
    }

    toggleButton(e) {
        console.log(this.state.status)
        this.setState({
            status: !this.state.status
        })
    }


    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeImgUrl(e) {
        this.setState({
            img_url: e.target.value,
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value,
        });
    }

    saveDvd() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            img_url: this.state.img_url,
            category: this.state.category,
            status: this.state.status
        };

        // Call API to Create a new dvd
        DvdService.create(data)
            .then(() => {
                this.props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    newDvd() {
        this.setState({
            id: null,
            title: "",
            description: "",
            img_url: "",
            category: "",
            status: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button onClick={this.newBook}>
                            Add
                         </button>
                    </div>
                ) : (

                        <div className="site-card-border-less-wrapper">
                            <Card className="card-create" title="ADD DVD" style={{ width: '30vw' }}>
                                <div>
                                    <p className="title-input">Title</p>
                                    <Input className="input" id="title" value={this.state.title} onChange={this.onChangeTitle} />
                                </div>
                                <Gap height={8} />
                                <div>
                                    <p className="title-input">Description</p>
                                    <Input className="input" id="description" value={this.state.description} onChange={this.onChangeDescription} />
                                </div>
                                <Gap height={8} />
                                <div>
                                    <p className="title-input">Image</p>
                                    <Input className="input" id="img_url" value={this.state.img_url} onChange={this.onChangeImgUrl} />
                                </div>
                                <Gap height={8} />
                                <div>
                                    <p className="title-input">Category</p>
                                    <Input className="input" id="category" value={this.state.category} onChange={this.onChangeCategory} />
                                </div>
                                <Gap height={8} />
                                <div>
                                    <p className="title-input">Status</p>
                                    <button className="toggle-status" name="status" value={this.state.status} onClick={this.toggleButton} >{this.state.status ? <FaToggleOn size="34px" color="blue" /> : <FaToggleOff size="34px" />}</button>
                                    <p><span>{this.state.status ? "available" : "not available"}</span></p>
                                </div>
                                <div>
                                    <Link className="link" title="Back" onClick={() => this.props.history.goBack()} />
                                    <Button className="button" title="Submit" onClick={(this.saveDvd)} />
                                </div>
                            </Card>
                        </div>

                    )}
            </div>
        );
    }
}