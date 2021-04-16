import React, { useState, useEffect, lazy } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as EmpTicketService from "../../services/EmpTicketService";
import {dateDisplay} from "../../components/controls/Datedisplay"


const Name="Srikanth"; //instead retrive cust ID from local storage 
//const dateDisplay = lazy(() => import("../../components/controls/Datedisplay"));
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
        //if ('productId' in fieldValues)
        //    temp.productId = fieldValues.productId.length != 0 ? "" : "This field is required."
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
                        disabled
                    />
                    <Controls.Input
                        label="Date and Time"
                        name="date"
                        value={date.substring(0, index)}
                        onChange={handleInputChange}
                        error={errors.date}
                        disabled
                    />
                    <Controls.Input
                        label="Service Exec ID"
                        name="serviceExId"
                        value={values.serviceExID}
                        onChange={handleInputChange}
                        error={errors.serviceExID}
                    />
                    <Controls.Input
                        label="Reviewer ID"
                        name="reviewerId"
                        value={values.reviewerID}
                        onChange={handleInputChange}
                        error={errors.reviewerID}
                    />
                    <Controls.Select
                        name="productId"
                        label="Product"
                        value={values.productId}
                        options={EmpTicketService.getProductCollection()}
                        isSearchable={false}
                        onChange={handleInputChange}
                        error={errors.productId}
                        disabled
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="priorityId"
                        label="Priority"
                        value={values.priorityId}
                        options={EmpTicketService.getPriorityCollection()}
                        error={errors.priorityId}
                    />
                    <Controls.Input
                        label=" Issue "
                        name="comment"
                        value={values.comment}
                        onChange={handleInputChange}
                        error={errors.comment}
                        disabled
                    />
                    <Controls.Select
                        name="statusId"
                        label="Status"
                        value={values.statusId}
                        options={EmpTicketService.getStatusCollection()}
                        error={errors.statusId}
                        disabled
                    />
                    <Controls.Input
                        label="Feedback"
                        name="feedback"
                        value={values.feedback}
                        error={errors.feedback}
                        disabled
                    />                    
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}