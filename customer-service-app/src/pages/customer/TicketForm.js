import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as CustTicketService from "../../services/CustTicketService";

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const Name="Srikanth"; //instead retrive cust ID from local storage 
const initialFValues = {
    id: 0,
    date: '',
    email: '',
    productId: '',
    serviceExId:'', 
    reviewerId:'',
    priorityId:'',
    comment:'',
    statusId:'1',
    feedback:'',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('productId' in fieldValues)
            temp.productId = fieldValues.productId.length != 0 ? "" : "This field is required."
        if ('statusId' in fieldValues)
            temp.statusId = fieldValues.statusId.length != 0 ? "" : "This field is required."
        if ('comment' in fieldValues)
            temp.comment = fieldValues.comment.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const date= new Date().toString();
    const index = date.lastIndexOf(':') +3;

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Cust Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Date and Time"
                        name="date"
                        value={date.substring(0, index)}
                        onChange={handleInputChange}
                        error={errors.date}
                    />
                    <Controls.Select
                        name="productId"
                        label="Product"
                        value={values.productId}
                        onChange={handleInputChange}
                        options={CustTicketService.getProductCollection()}
                        error={errors.productId}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label=" Issue "
                        name="comment"
                        value={values.comment}
                        onChange={handleInputChange}
                        error={errors.comment}
                    />
                    <Controls.Select
                        name="statusId"
                        label="Status"
                        value={values.statusId}
                        onChange={handleInputChange}
                        options={CustTicketService.getStatusCollection()}
                        error={errors.statusId}
                    />
                    <Controls.Input
                        label="Feedback"
                        name="feedback"
                        value={values.feedback}
                        onChange={handleInputChange}
                        error={errors.feedback}
                        disabled={values.statusId==1? true: false}
                    />
                    
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}