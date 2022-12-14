import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as CustTicketService from "../../services/CustTicketService";


const initialFValues = {
    TicketID: 0,
    date: '',
    Custname: '',
    ProductID: '',
    serviceExId:'', 
    reviewerId:'',
    priorityId:'',
    comment:'',
    Status:'Open',
    feedback:'',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ProductID' in fieldValues)
            temp.ProductID = fieldValues.ProductID.length !== 0 ? "" : "Please choose a product to proceed."
        if ('Status' in fieldValues)
            temp.Status = fieldValues.Status.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
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
            console.log("submit validated")
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
                <Grid item xs={20}>
                    {/*<Controls.Input
                        label="TicketID"
                        name="TicketID"
                        value={values.TicketID}
                        onChange={handleInputChange}
                        error={errors.TicketID}
                    />*/}
                    <Controls.Select
                        name="ProductID"
                        label="Product"
                        value={values.ProductID}
                        onChange={values.ProductID==0? handleInputChange: null}
                        options={CustTicketService.getProductCollection()}
                        error={errors.ProductID}
                    />
                    {/*<Controls.Input
                        label=" Issue "
                        name="comment"
                        value={values.comment}
                        onChange={handleInputChange}
                        error={errors.comment}
                    />*/}
                    
                    <Controls.Select
                        name="Status"
                        label="Status"
                        value={values.Status}
                        onChange={localStorage.getItem("status")=="Open"?handleInputChange:null}
                        options={CustTicketService.getStatusCollection()}
                        error={errors.Status}
                    />
                    <Controls.Input
                        label="Feedback"
                        name="feedback"
                        value={values.feedback}
                        onChange={values.feedback==""?handleInputChange:null}
                        error={errors.feedback}
                        disabled={values.Status==="Open"? true: false}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            color="primary"/>
                        <Controls.Button
                            text="Reset"
                            color="resetbtn"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}