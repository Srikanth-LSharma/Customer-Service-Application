import React, { useEffect, useState} from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as EmpTicketService from "../../services/EmpTicketService";
import axios from 'axios';
import SnackBar from'../../components/SnackBar'

//const dateDisplay = lazy(() => import("../../components/controls/Datedisplay"));
const initialFValues = {
    TicketID: 0,
    ServiceReqDate: '',
    CustName: '',
    ProductID: '',
    ServiceExecId:'2', 
    ReviewerId:'3',
    PriorityId:'3',
    comment:'',
    Status:'Open',
    Feedback:'',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [empdata,setEmpData] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        //if ('productId' in fieldValues)
        //    temp.productId = fieldValues.productId.length != 0 ? "" : "This field is required."
        if ('comment' in fieldValues)
            temp.comment = fieldValues.comment.length !== 0 ? "" : "This field is required."
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
            addOrEdit(values, resetForm);
        }
    }
    const unableToEdit = () =>{
        setNotify({
            isOpen: true,
            message: "",
            type: 'error'
        })
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    useEffect(()=>{
        axios.get("http://localhost:888/api/getEmployees").then(res=>{
        setEmpData(res.data);
        console.log("EmpData:",empdata);
    }) .catch((error) => {
        console.log(error);
    })
    },[])
    
    
    const date= new Date().toString();
    const index = date.lastIndexOf(':') +3;

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        label="Service Exec"
                        name="ServiceExecId"
                        value={values.ServiceExecId}
                        options={empdata}
                        onChange={localStorage.getItem("status")=="Open"?handleInputChange:null}
                        error={errors.ServiceExecId}
                        align='center'
                    />
                    <Controls.Select
                        label="Reviewer"
                        name="ReviewerId"
                        options={empdata}
                        value={values.ReviewerId}
                        onChange={localStorage.getItem("status")=="Open" && values.ReviewerId==0? handleInputChange: null}
                        error={errors.ReviewerId}
                    />
                    <Controls.Select
                        name="PriorityId"
                        label="Priority"
                        value={values.PriorityId}
                        options={EmpTicketService.getPriorityCollection()}
                        onChange={localStorage.getItem("status")=="Open"?handleInputChange:null}
                        error={errors.PriorityId}
                    />                 
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            color="primary"/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}