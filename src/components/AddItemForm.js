import NavBar from "./NavBar";
import React, {useContext} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {useState} from 'react';
import AuthContext from "../context/AuthProvider";
import {AxiosContext} from "../context/AxiosProvider";
import Sidebar from "./SideBar";



const UPLOAD_URL = '/image/upload';


const AddItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formNotSubmitted, setFormNotSubmitted] = useState(false);

    const authContext = useContext(AuthContext);
    const axios = useContext(AxiosContext);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = file ? file.name.toLowerCase().substr(file.name.lastIndexOf('.')) : '';
        if (!allowedExtensions.includes(fileExtension)) {
            setFileError('Only JPG and PNG files are allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('file', file);


        const response = await axios.imageAxios.post(UPLOAD_URL,
            formData,
            {
                headers: {
                    'Authorization': authContext.getAccessToken(),
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status === 200) {
            setFormSubmitted(true);
        } else {
            setFormNotSubmitted(true)
        }

        setName('');
        setPrice('');
        setFile(null);
        setFileError('');

    };

    return (
        <>
            <NavBar/>
            <MDBContainer className="text-center mt-5">
                <MDBRow className="justify-content-center">
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle className="font-weight-bold">Add Item</MDBCardTitle>
                                <form onSubmit={handleSubmit} style={{padding: '20px'}}>
                                    <MDBInput label="Item Name" type="text" value={name} onChange={handleNameChange} required
                                              style={{marginBottom: '20px'}}/>
                                    <MDBInput label="Price" type="number" value={price} onChange={handlePriceChange} required
                                              style={{marginBottom: '20px'}}/>
                                    <MDBInput type="file" onChange={handleFileChange} required
                                              style={{marginBottom: '20px'}}/>
                                    {fileError && <div style={{color: 'red', marginBottom: '20px'}}>{fileError}</div>}

                                    {formSubmitted &&
                                        <div style={{color: 'green', marginBottom: '20px'}}>Form submitted successfully!</div>}

                                    {formNotSubmitted && <div style={{color: 'red', marginBottom: '20px'}}>Could not submit form!</div>}

                                    <div className="d-grid ap-2">
                                        <MDBBtn onClick={handleSubmit} type="submit">Submit</MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>


    );
}

export default AddItem
