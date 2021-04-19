import React, { useState, useEffect } from 'react'
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
import Client from '../../services/api/Client'
import SnackBar from'../../components/SnackBar'
import ChatIcon from '@material-ui/icons/Chat';

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
    { id: 'TicketID', label: 'Ticket ID' },
    { id: 'name', label: 'Customer Name' },
    { id: 'date', label: 'Date' },
    { id: 'Product', label: 'Product' },    
    { id: 'status', label: 'Status' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CustomerTicketsList() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [statusID, setStatusID] = useState("")
    const [customerID ,setCustomerID] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [servID, setServID] = useState("");
    const [revID, setRevID] = useState("");
    const [prioID, setPrioID] = useState("");

    const getProductCollection = () => ([
        { id: '1', title: 'Monitor' },
        { id: '2', title: 'Keyboards and mice' },
        { id: '3', title: 'Motherboards' },
        { id: '4', title: 'Printers' },
        { id: '5', title: 'Scanners' },
        { id: '6', title: 'Microphone' },
        { id: '7', title: 'Webcam' },
        { id: '8', title: 'Speakers' },
        { id: '9', title: 'DVD Drives' },
        { id: '10', title: 'Adapters and Chargers' },
        { id: '11', title: 'Processors' },
        { id: '12', title: 'Controllers' },
    ])
   
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    const displayTickets=()=>{
        let products = getProductCollection();
        Client.get("/api/CustomerTickets").then(res=>{
              setRecords(res.data)
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
              })))
            console.log(res.data)
        })
          .catch((error) => {
            console.log(error);
          })
    }

    useEffect(() => {
        displayTickets()
        getCustID()
      }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.Product.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const getCustID=()=>{
        Client.get('/api/Customer').then(res=>{
            setCustomerID(res.data.CustID)
        }).catch((e)=>{
            console.log(e)
        });
    }

    
    const getTicketDetails=(id)=>{
        Client.get('/api/CustTicket/'+id).then(
            response =>{
                   console.log("Ticket details:",response.data)
                   setServID(Number(response.data.ServiceExecId));
                   setRevID(Number(response.data.ReviewerId));
                   setPrioID(Number(response.data.PriorityId));
                   console.log("servID:",servID,"revID:",revID,"PrioID",prioID)
            }).catch((e)=>console.log(e))
    }
    

    const addOrEdit = (ticket, resetForm) => {
        const data = {
            ProdID: Number(ticket.ProductID)
        };
        if (ticket.TicketID == 0){      
            console.log("Ticket:",data);
            Client.post('/api/AddTicket',data).then(
                response =>{
                    displayTickets()
                       console.log("Accepted input",response.data)
                }).catch((e)=>console.log(e))
            console.log("Test Addition");
        }
            
        else{

            getTicketDetails(ticket.TicketID)

            const editdata={
                TicketID: Number(ticket.TicketID),
                ServiceReqDate: ticket.ServiceReqDate,
                CustID: Number(customerID),
                ProdID: Number(ticket.ProductID),
                ServiceExecID: servID,
                ReviewerID:  revID,
                PriorityID:  prioID,
                Feedback: ticket.Feedback,
                Status: ticket.Status
            }
            console.log("Ticket Edit Data:",editdata)
            Client.put('/api/EditCustTicket/'+editdata.TicketID,editdata).then(
                response =>{
                    displayTickets()
                       console.log("Accepted input",response.data)
                }).catch((e)=>console.log(e))
            }            
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
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
        //CustTicketService.deleteTicket(id);
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
                        label="Search Product"
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
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.TicketID}>
                                    <TableCell align='center'>{item.TicketID}</TableCell>
                                    <TableCell align='center'>{item.CustName}</TableCell>
                                    <TableCell align='center'>{item.ServiceReqDate}</TableCell>                                   
                                    <TableCell align='center'>{item.Product}</TableCell>                                    
                                    <TableCell>
                                        <div  align='center' className={item.Status=='Open'? classes.statusCellOpen : classes.statusCellClosed} >{item.Status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>{item.Feedback}</TableCell>
                                    <TableCell align='center'>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        {/*<Controls.ActionButton
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
                                        </Controls.ActionButton>*/}
                                        <Controls.ActionButton
                                            color="primary" >
                                            <ChatIcon fontSize="small" />
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
            <SnackBar notify={notify} setNotify={setNotify} />
        </>
    )
}