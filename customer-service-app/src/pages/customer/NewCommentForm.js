import React, { useEffect,useState } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import SnackBar from'../../components/SnackBar'


const initialFValues = {
    comment: "This is a test message",
}

export default function CommentForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
            setNotify({
                isOpen: true,
                message: 'Sent',
                type: 'success'
            });
        }
        else{
            setNotify({
                isOpen: true,
                message: 'Message cannot be empty',
                type: 'error'
            });
        }
        
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={30}>
                    <Controls.Input
                        label="Comment"
                        name="comment"
                        value={values.comment}
                        onChange={handleInputChange}
                        error={errors.feedback}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Send"
                            color="primary"/>
                    </div>
                </Grid>
            </Grid>
            <SnackBar notify={notify} setNotify={setNotify} />
        </Form>
    )
}