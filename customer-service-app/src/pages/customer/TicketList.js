import React, { useState } from 'react'
import TicketForm from "./TicketForm";
import PageHeader from "../../components/PageHeader";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as CustTicketService from "../../services/CustTicketService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '30%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    statusCellOpen:{
        backgroundColor: 'red',
        borderRadius:8,
        color:'white',
        fontSize:18,
        minHeight:30,
        maxWidth:80,  
    },
    statusCellClosed:{
        backgroundColor: 'green',
        borderRadius:8,
        color:'white',
        fontSize:18,
        minHeight:30,
        maxWidth:80,  
    },
}))


const headCells = [
    { id: 'id', label: 'Ticket ID' },
    { id: 'email', label: 'Customer Email ID' },
    { id: 'date', label: 'Date' },
    { id: 'product', label: 'Product' },    
    { id: 'statusId', label: 'Status' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(CustTicketService.getAllTickets())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.email.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            CustTicketService.insertTicket(employee)
        else
            CustTicketService.updateTicket(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(CustTicketService.getAllTickets())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        CustTicketService.deleteTicket(id);
        setRecords(CustTicketService.getAllTickets())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Ticket List"
                subTitle="Form design with validation"
                icon={<RateReviewTwoToneIcon fontSize="small" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Customer Email ID"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell align='center'>{item.id}</TableCell>
                                    <TableCell align='center'>{item.email}</TableCell>
                                    <TableCell align='center'>{item.date}</TableCell>                                   
                                    <TableCell align='center'>{item.product}</TableCell>                                    
                                    <TableCell>
                                        <div  align='center' className={item.status=='Open'? classes.statusCellOpen : classes.statusCellClosed} >{item.status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>{item.feedback}</TableCell>
                                    <TableCell align='center'>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Ticket Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TicketForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}