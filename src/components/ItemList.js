import NavBar from "./NavBar";
import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthProvider";
import {AxiosContext} from "../context/AxiosProvider";
import Popup from "./Popup";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBContainer,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn,
    MDBIcon,
    MDBNavbarToggler,
    MDBCol, MDBRow
} from 'mdb-react-ui-kit';
import Sidebar from "./SideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const GET_ALL_ITEMS = '/image/all';
const GET_LOGGED_USER_ITEMS = 'item/logged-user'
const GET_MATCHED_ITEMS = 'image/matched'
const LIKE_ITEM = 'item/like'
const GET_LIKED_ITEMS = 'image/like'
const GET_SPEC_MATCHED_ITEMS = 'image/match'
const DELETE_MATCH = 'item/match'
const GET_USER_INFO = 'item/user'

function ItemList() {
    const axios = useContext(AxiosContext);
    const authContext = useContext(AuthContext);

    const [items, setItems] = useState([]);

    const [itemsForLoggedUser, setItemsForLoggedUser] = useState([]);

    const [selectedItemName, setSelectedItemName] = useState('All');

    const [selectedItemId, setSelectedItemId] = useState('All');

    const [isMatchesVisible, setIsMatchesVisible] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [isMatch, setIsMatch] = useState(false);

    const [isMatchVisible, setIsMatchVisible] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [dialogContent, setDialogContent] = useState("user info");

    const [titleMessage, setTitleMessage] = useState('Posts');

    const dropdownItemStyles = {
        fontSize: '18px',
        fontWeight: 'bold'
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const handleCategoryChange = (id, name) => {
        setSelectedItemName(name);
        setSelectedItemId(id)
        console.log(selectedItemId)
    };

    const handleGetLikes = () => {
        axios.imageAxios.get(`${GET_LIKED_ITEMS}/${selectedItemId}`, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            let itemsTmp = []
            response.data.forEach((it) => {
                itemsTmp.push({
                    id: it.metaData.uuid,
                    name: it.metaData.name,
                    price: it.metaData.price,
                    image: it.image
                })
            })
            setTitleMessage(`Likes for ${selectedItemName}`)
            setItems(itemsTmp);
            setIsMatchVisible(false)
            setIsMatchesVisible(false)
        });
    }

    const handleGetMatches = () => {
        axios.imageAxios.get(`${GET_SPEC_MATCHED_ITEMS}/${selectedItemId}`, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            let itemsTmp = []
            response.data.forEach((it) => {
                itemsTmp.push({
                    id: it.metaData.uuid,
                    name: it.metaData.name,
                    price: it.metaData.price,
                    image: it.image
                })
            })
            setTitleMessage(`Matches for ${selectedItemName}`)
            setItems(itemsTmp);
            setIsMatchVisible(true)
            setIsMatchesVisible(false)
        });
    }

    const handleLike = (id) => {
        axios.publicAxios.get(`${LIKE_ITEM}/${selectedItemId}/${id}`, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            if(response.data){
                toast.success("YOU SCORED MATCH!")
            }else {
                toast.success("like has been saved")
            }
            handleSearch()
        });
    }

    const handleSearch = () => {
        axios.imageAxios.get(`${GET_MATCHED_ITEMS}/${selectedItemId}`, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            let itemsTmp = []
            response.data.forEach((it) => {
                itemsTmp.push({
                    id: it.metaData.uuid,
                    name: it.metaData.name,
                    price: it.metaData.price,
                    image: it.image
                })
            })
            setTitleMessage(`Posts for ${selectedItemName}`)
            setItems(itemsTmp);
            setIsMatchVisible(false)
            setIsMatchesVisible(true)
        });
    }

    useEffect(() => {
        axios.publicAxios.get(GET_LOGGED_USER_ITEMS, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            let itemsTmp = []
            response.data.forEach((it) => {
                itemsTmp.push({
                    id: it.uuid,
                    name: it.name,
                    price: it.price,
                })
            })
            setIsMatchVisible(false)
            console.log(itemsTmp)
            setItemsForLoggedUser(itemsTmp);
        });
    }, [axios, authContext]);

    useEffect(() => {
        axios.imageAxios.get(GET_ALL_ITEMS, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            let itemsTmp = []
            response.data.forEach((it) => {
                itemsTmp.push({
                    id: it.metaData.uuid,
                    name: it.metaData.name,
                    price: it.metaData.price,
                    image: it.image
                })
            })
            setItems(itemsTmp);
        });
    }, [axios, authContext]);


    function handleDeleteMatch(id, name) {
        const confirmed = window.confirm(`do you want to delete ${name} ?`);
        if(confirmed){
            axios.publicAxios.delete(`${DELETE_MATCH}/${selectedItemId}/${id}`, {
                headers: {'Authorization': authContext.getAccessToken()}
            }).then(() => {
                handleGetMatches()
            });
        }
    }

    function handleInfo(id) {
        axios.publicAxios.get(`${GET_USER_INFO}/${id}`, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then((response) => {
            toast.success(`username: ${response.data.username}  email: ${response.data.email}`)
        });
    }

    return (
        <>
            <NavBar/>
            <ToastContainer position="bottom-center" limit='2000'/>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="1">
                        <Sidebar onLike={handleGetLikes} onMatch={handleGetMatches}/>
                    </MDBCol>
                    <MDBCol md="10">
                        <MDBCardTitle className="d-flex justify-content-center"
                                      style={{fontWeight: 'bold', fontSize: '40px', color: 'grey', margin: '2%',}}>{titleMessage}</MDBCardTitle>
                        <MDBContainer className="d-flex justify-content-center" style={{minHeight: '100vh'}}>
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-12" style={{minWidth: '100vh'}}>
                                        <div className="d-flex justify-content-center"
                                             style={{marginBottom: '3%'}}>
                                            <div className="custom-dropdown" style={{width: '70%', marginRight: '1%'}}>
                                                <MDBDropdown className="w-100">
                                                    <MDBDropdownToggle caret color="success" className="w-100"
                                                                       style={dropdownItemStyles}>
                                                        {selectedItemName}
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        {itemsForLoggedUser.map((item) => (
                                                            <MDBDropdownItem
                                                                key={item.id}
                                                                onClick={() => handleCategoryChange(item.id, item.name)}
                                                                style={dropdownItemStyles}
                                                            >
                                                                {item.name} ${item.price.toFixed(2)}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                            <MDBBtn color="success" onClick={handleSearch} style={{width: '30%'}}>
                                                Search
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </div>
                                <Popup isOpen={isOpen} toggleModal={toggleModal} isMatch={isMatch}
                                       onClose={handleSearch}/>
                                <div className="row">
                                    {items.map((item) => (
                                        <div className="col-md-6 d-flex justify-content-center" key={item.id}>
                                            <MDBCard
                                                style={{
                                                    maxHeight: '400px',
                                                    margin: '20px',
                                                    border: '1px solid #ccc',
                                                    minWidth: '80%',
                                                    objectFit: 'cover'
                                            }}
                                            >
                                                <MDBCardImage
                                                    src={`data:image/jpeg;base64,${item.image}`}
                                                    alt={item.name}
                                                    className="rounded mx-auto d-block"
                                                    style={{
                                                        width: '80%',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        margin: '20px'
                                                    }}
                                                />
                                                <MDBCardBody className="d-flex flex-column align-items-center"
                                                             style={{padding: "10px"}}>
                                                    <MDBCardTitle>{item.name}</MDBCardTitle>
                                                    <MDBCardTitle>${item.price.toFixed(2)}</MDBCardTitle>
                                                </MDBCardBody>
                                                {isMatchesVisible && (
                                                    <MDBCardBody className="d-flex flex-column align-items-center"
                                                                 style={{padding: "10px"}}>
                                                        <MDBNavbarToggler
                                                            type='button'
                                                            onClick={() => handleLike(item.id, item.name)}>
                                                            <MDBIcon className='nav-link' icon='heart' size='2x'/>
                                                        </MDBNavbarToggler>
                                                    </MDBCardBody>
                                                )}
                                                { isMatchVisible && (
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <MDBCardBody className="d-flex flex-column align-items-center"
                                                                         style={{padding: "10px"}}>
                                                                <MDBNavbarToggler
                                                                    type='button'
                                                                    onClick={() => handleDeleteMatch(item.id, item.name)}>
                                                                    <MDBIcon className='nav-link' icon='trash' size='2x'/>
                                                                </MDBNavbarToggler>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                        <MDBCol>
                                                            <MDBCardBody className="d-flex flex-column align-items-center"
                                                                         style={{padding: "10px"}}>
                                                                <MDBNavbarToggler
                                                                    type='button'
                                                                    onClick={() => handleInfo(item.id, item.name)}>
                                                                    <MDBIcon className='nav-link' icon='question-circle' size='2x'/>
                                                                </MDBNavbarToggler>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow> )
                                                }
                                            </MDBCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default ItemList;
