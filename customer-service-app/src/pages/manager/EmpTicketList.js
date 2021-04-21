import React, { useState, useEffect } from 'react'
import EmpTicketForm from "./EmpTicketForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as EmpTicketService from "../../services/EmpTicketService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ConfirmDialog from "../../components/ConfirmDialog";
import Client from '../../services/api/Client'
import SnackBar from'../../components/SnackBar'
import ChatIcon from '@material-ui/icons/Chat';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3),
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
    root: {
        display: "flex",
        "& > * + *": {
          marginLeft: theme.spacing(10),
        },
      },
}))


const headCells = [
    { id: 'id', label: 'Ticket ID' },
    { id: 'name', label: 'Customer Name' },
    { id: 'date', label: 'Date' },
    { id: 'serviceExId', label: 'ServiceExID' },
    { id: 'reviewerId', label: 'ReviewerID' },
    { id: 'Product', label: 'Product' },
    { id: 'Priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customerID ,setCustomerID] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const displayTickets=()=>{
        let products= EmpTicketService.getProductCollection();
        let priorities = EmpTicketService.getPriorityCollection();
        Client.get("/api/EmpTickets").then(res=>{
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
                Priority: priorities[x.PriorityId - 1].title,
              })))
            //console.log(res.data)
        })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          });
    }

    const getCustID=(custname)=>{
        
    }

    const getTicketDetails=(id)=>{
        Client.get('/api/ServExecTicket/'+id).then(
            response =>{
                   console.log("Ticket details:",response.data)
            }).catch((e)=>console.log(e))
    }

    useEffect(() => {
        displayTickets()
      }, []);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.CustName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const addOrEdit = (ticket, resetForm) => {
        console.log("ticketID:",ticket.TicketID)
        getTicketDetails(ticket.TicketID)
        
        Client.get('/api/CustomerIdByName/'+ticket.CustName).then(res=>
        {
            setCustomerID(res.data)
            const editdata={
                    TicketID: Number(ticket.TicketID),
                    ServiceReqDate: ticket.ServiceReqDate,
                    CustID: res.data,
                    ProdID: Number(ticket.ProductID),
                    ServiceExecID:  Number(ticket.ServiceExecId),
                    ReviewerID:   Number(ticket.ReviewerId),
                    PriorityID:   Number(ticket.PriorityId),
                    Feedback: ticket.Feedback,
                    Status: ticket.Status
                }
            console.log("Edit Data to be passed to api:",editdata);
            Client.put('/api/EditEmpTicket/'+editdata.TicketID,editdata).then(
            response =>{
                console.log("Ticket Edited");
                displayTickets()
                   console.log("Accepted input",response.data)
            }).catch((e)=>console.log(e))
        }).catch((e)=>{
            console.log(e)
        });
        
         
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        });
        setTimeout(() => {
            setLoading(false);
          }, 2000);
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
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
                                (<TableRow key={item.TicketID}>
                                    <TableCell align='center'>{item.TicketID}</TableCell>
                                    <TableCell align='center'> {item.CustName}</TableCell>
                                    <TableCell align='center'>{item.ServiceReqDate.split("T")[0]}</TableCell>
                                    <TableCell align='center'>{item.ServiceExecId}</TableCell>
                                    <TableCell align='center'>{item.ReviewerId}</TableCell>
                                    <TableCell align='center'>{item.Product}</TableCell>
                                    <TableCell align='center'>{item.Priority}</TableCell>
                                    <TableCell align='center'>
                                        <div className={item.Status==='Open'? classes.statusCellOpen : classes.statusCellClosed} align='center' >{item.Status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>{item.Feedback===null? 'Nil':item.Feedback}</TableCell>
                                    <TableCell align='center'>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="primary" >
                                            <ChatIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                        {loading === true && (
                            <div className={classes.root}>
                                 <CircularProgress />
                            </div>
                        )}
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
            <SnackBar notify={notify} setNotify={setNotify} />
        </>
    )
}