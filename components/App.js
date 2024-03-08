import React, { useState, useEffect } from 'react';
import { getAll, post, put, deletebyId } from '..memdb';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';
import './App.css';

function App() {

    let blankCustomer = { "id": -1, "name": "", "email": "", "password": ""};
    const [customers, setCustomers] = useState([]);
    const [formObject, setFormObject] = useState(blankCustomer);
    let mode = (formObject.id >= 0) ? 'Update' : 'Add';
    useEffect( () => { getCustomers() }, []);

    const getCustomers = function() {
        setCustomers(getAll());
    }

    const handleListClick = function(item) {
        setFormObject(item);
    }

    const handleInputChange = function (event) {
        const name = event.target.name;
        const value = event.target.value;
        let newFormObject = {...formObject}
        newFormObject[name] = value;
        setFormObject(newFormObject);
    }

    let onCancelClick = function () {
        setFormObject(blankCustomer);
    }

    let onDeleteClick = function () {
        if (formObject.id >= 0) {
            deletebyId(formObject.id);
        }
        setFormObject(blankCustomer);
    }

    let onSaveClick = function () {
        if (mode === 'Add') {
            post(formObject);
        }
        if (mode === 'Update') {
            put(formObject.id, formObject);
        }
        setFormObject(blankCustomer);
    }

    let otherVars = {
        mode: mode,
        handleInputChange: handleInputChange,
        formObject: formObject,
        onDeleteClick: onDeleteClick,
        onSaveClick: onSaveClick,
        onCancelClick: onCancelClick
    }

    return (

        <div className="app">
            <CustomerList
            customers={customers}
            formObject={formObject}
            handleListclick={handleListClick} />
            <CustomerAddUpdateForm{...otherVars} />
        </div>
    );
}