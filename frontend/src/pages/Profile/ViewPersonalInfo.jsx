import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";


import { viewUserProfile,updateUserProfile } from "../../services/user";

import './profile_styles.css'

const ViewPersonalInfo = () => {
    const [name,setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    const [isEditable,setIsEditable] = React.useState(false)

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)


    const getProfile = async () => {
        try {
            const res = await viewUserProfile();
            if (res.status === 200) {
                setName(res.data.name)
                setEmail(res.data.email)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        getProfile();
    }, [])

    const toggleEditInput = () => {
        setIsEditable(!isEditable)
    }

    const clearMsgs = () => {
        setSuccessMessage('')
        setSuccessVisible(false)
        setErrorMsg('')
        setErrorVisible(false)
    }

    // Updating User Info 
    
    // form validation 
    const validateForm = () => {
        if (!name || !email) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const updatePersonalInfo = async () => {
        if (!validateForm()) {
            return
        }
        const personalData = {
            name:name,
            email: email
        }
        try {
            const response = await updateUserProfile(personalData)
            if (response.status == 200) {
                setSuccessMessage("Personal Info Updated Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)
                toggleEditInput()
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="containerv">
            <h2 className="headingv">Personal Information</h2>
            
            <div className="section-containerv " onFocus={clearMsgs}>
                { errorVisible && (
                    <div className="error-containerv ">
                        <p  className="error-textv">{errorMsg}</p>
                    </div>)
                }
                { successVisible && (
                    <div className="success-containerv ">
                        <p  className="success-textv">{successMessage}</p>
                    </div>)
                    }

                <div className="headv ">
                    <div className="head-leftv">
                        <BiEdit size={30}  className="icon-leftv" />
                    </div>
                 
                    <div className="head-rightv">
                        <button className="btnv " onClick={toggleEditInput}>
                            <BiEdit size={20} className="btn-iconv" />
                            <span>Edit</span>
                        </button>
                    </div>
                   
                </div>
                <hr className="dividerv" />
                <div className="bodyv"> 
                    <label htmlFor="name" className="labelv">Name</label>
                    {
                        !isEditable ? 
                        (<input disabled value={name}  id='name' className="inputv"  type="text" />):
                        (<input  value={name} onChange={(e) => setName(e.target.value)} id='name' className="inputv"  type="text" />)

                    }
                    <label htmlFor="email" className="labelv" >Email</label>
                    {
                        isEditable ?
                        (
                            <input  value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="inputv"  type="email" />
                        ):
                        (
                            <input disabled value={email}  id='email' className="inputv"  type="email" />
                        )

                    }
                </div>
                {
                    isEditable && (
                    <div className="btn-sec-containerv">
                        <button className="btn-secv" onClick={updatePersonalInfo}  >
                            Update Info
                        </button>
                    </div>)
                }
                
            </div>
        </div>
    )
}

export default ViewPersonalInfo;