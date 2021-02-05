import React, { Component } from "react";
import './DvdList.scss';
import { Link } from "react-router-dom";
import DvdService from "../../Services/DvdServices";
import { Gap } from "../../Components";
import { Input, Tag, Button, List, Pagination } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


export default class DvdsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveDvds = this.retrieveDvds.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDvd = this.setActiveDvd.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

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
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.retrieveDvds();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
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

    searchTitle() {
        this.setState({
            currentDvd: null,
            currentIndex: -1,
        });

        // Call API to search dvds by title
        DvdService.searchByTitle(this.state.searchTitle)
            .then(response => {
                const data = response.data;
                this.setState({
                    Dvds: data,
                });
            })
            .catch(error => {
                console.log(error);
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

    deleteDvd(id) {
        // Call API to delete dvds
        DvdService.delete(id)
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
        const { searchTitle, Dvds } = this.state;
        const filterDvds = Dvds.filter(Dvd => {
            return Dvd.title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1
        })

        const { Search } = Input;


        return (
            <div>
                <Search type="text" placeholder="search by title" value={searchTitle} onChange={this.onChangeSearchTitle} style={{ width: 250 }} enterButton />
                <Gap height={15} />
                <Link to={"/dvds/add"}>
                    <Button type="primary" onClick={this.showModal}>+ &nbsp; Add</Button>
                </Link>
                <Gap height={15} />
                <List>
                    {Dvds &&
                        filterDvds.map((Dvd, index) => (
                            <List.Item key={index} className="dvd-list">
                                <div>
                                    <img className="img-list"
                                        alt="Cover DVD"
                                        src={Dvd.img_url}
                                    />
                                </div>
                                <div className="title-list">
                                    {Dvd.title}
                                </div>
                                <div className="description-list">
                                    {Dvd.description}
                                </div>
                                <div className="category-list">
                                    <Tag color="magenta">{Dvd.category}</Tag>
                                </div>
                                <div className="action-list">
                                    {Dvd.status === 0 ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    <Link className="link-edit" to={"/dvds/" + Dvd.id}><EditOutlined /></Link>
                                    <DeleteOutlined className="button-delete" onClick={() => { if (window.confirm("Are you sure want to delete this item?")) { this.deleteDvd(Dvd.id) } }} />
                                </div>
                            </List.Item>
                        ))}
                </List>
                <Gap height={10} />
                <Pagination className="ant-list-pagination" defaultCurrent={1} total={1} />
            </div>
        );
    }
}

