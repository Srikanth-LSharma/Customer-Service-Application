import React, { useState } from 'react'
import EmpTicketForm from "./EmpTicketForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as EmpTicketService from "../../services/EmpTicketService";
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
        maxWidth:50,  
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    statusCellClosed:{
        backgroundColor: 'green',
        borderRadius:8,
        color:'white',
        fontSize:18,
        minHeight:30,
        maxWidth:60,  
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
}))


const headCells = [
    { id: 'id', label: 'Ticket ID' },
    { id: 'email', label: 'Customer Email' },
    { id: 'date', label: 'Date' },
    { id: 'serviceExId', label: 'ServiceExID' },
    { id: 'reviewerId', label: 'ReviewerID' },
    { id: 'product', label: 'Product' },
    { id: 'priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(EmpTicketService.getAllTickets())
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
        
        EmpTicketService.updateTicket(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(EmpTicketService.getAllTickets())
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
                        label="Search Customer "
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.serviceExID}</TableCell>
                                    <TableCell>{item.reviewerID}</TableCell>
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>{item.priority}</TableCell>
                                    <TableCell>
                                        <div className={item.status=='Open'? classes.statusCellOpen : classes.statusCellClosed} >{item.status} </div> 
                                    </TableCell>
                                    <TableCell>{item.feedback===''? '-':item.feedback}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
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
                <EmpTicketForm
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