import React, { useState, useEffect, lazy } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as EmpTicketService from "../../services/EmpTicketService";
import {dateDisplay} from "../../components/controls/Datedisplay"


const Name="Srikanth"; //instead retrive cust ID from local storage 
//const dateDisplay = lazy(() => import("../../components/controls/Datedisplay"));
const initialFValues = {
    TicketID: 0,
    ServiceReqDate: '',
    CustName: '',
    ProductID: '',
    ServiceExecId:'', 
    ReviewerId:'',
    PriorityId:'',
    comment:'',
    Status:'Open',
    Feedback:'',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
                <Grid item xs={10} align='center'>
                    <Controls.Input
                        label="Service Exec ID"
                        name="ServiceExecId"
                        value={values.ServiceExecId}
                        onChange={handleInputChange}
                        error={errors.ServiceExecId}
                        align='center'
                    />
                    <Controls.Input 
                        label="Reviewer ID"
                        name="ReviewerId"
                        value={values.ReviewerId}
                        onChange={handleInputChange}
                        error={errors.ReviewerId}
                        align='center'
                    />
                    <Controls.Select
                        name="PriorityId"
                        label="Priority"
                        value={values.PriorityId}
                        options={EmpTicketService.getPriorityCollection()}
                        error={errors.PriorityId}
                        align='center'
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