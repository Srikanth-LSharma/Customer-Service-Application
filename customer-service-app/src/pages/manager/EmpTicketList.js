import React, { useState, useEffect } from 'react'
import EmpTicketForm from "./EmpTicketForm";
import {  useHistory } from 'react-router-dom';
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
import useFullPageLoader from '../../components/useFullPageLoader'
import ChatIcon from '@material-ui/icons/Chat';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import TokenExpiry from '../../services/api/TokenExpiry'
import CheckExpiry from '../../services/api/TokenExpiry';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0),
        marginRight: theme.spacing(1),
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
    loadericon:{
        position:'absolute',
        top:'230%',
        right:'45%',
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
    { id: 'ServiceEx', label: 'ServiceExId' },
    { id: 'Reviewer', label: 'ReviewerId' },
    { id: 'Product', label: 'Product' },
    { id: 'Priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {
    const history = useHistory();
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customerID ,setCustomerID] = useState("");
    const [empdata,setEmpData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
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
        //let employees = EmpTicketService.getEmployeeCollection();
        showLoader();
        Client.get("/api/EmpTickets").then(res=>{
            hideLoader();
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
                Priority: priorities[x.PriorityId - 1].title,
              })))
            //console.log(res.data)
        })
          .catch((e) => {
            hideLoader();
            if(e.Message=="Authorization has been denied for this request."){
                setNotify({
                    isOpen: true,
                    message: "Sorry! Session expired",
                    type: 'info'
                })
                setTimeout(() => {
                    setNotify({
                      isOpen: true,
                      message: "Please login again to continue..",
                      type: "info",
                    })
                  }, 2000);
                  setTimeout(() => {                       
                    localStorage.clear();
                    history.push('/');
                  }, 4000);
            }
          });
    }

    const getTicketDetails=(id)=>{
        Client.get('/api/ServExecTicket/'+id).then(
            response =>{
                   //console.log("Ticket details:",response.data)
            }).catch((e)=>console.log(e))
    }

    useEffect(() => {
        displayTickets()
        axios.get("http://localhost:888/api/getEmployees").then(res=>{
        setEmpData(res.data);
        //console.log("EmpData:",empdata);
    }) .catch((error) => {
        console.log(error);
    })
    }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.CustName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const addOrEdit = (ticket, resetForm) => {
        //console.log("ticketID:",ticket.TicketID)
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
                //console.log("Ticket Edited");
                displayTickets()
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                });
                // console.log("Accepted input",response.data)
            }).catch((e)=>{
                setNotify({
                    isOpen: true,
                    message: e.Message,
                    type: 'error'
                })
                if(e.Message=="Authorization has been denied for this request."){
                    setNotify({
                        isOpen: true,
                        message: "Sorry! Session expired",
                        type: 'info'
                    })
                    setTimeout(() => {
                        setNotify({
                          isOpen: true,
                          message: "Please login again to continue..",
                          type: "info",
                        })
                      }, 2000);
                      setTimeout(() => {                       
                        localStorage.clear();
                        history.push('/');
                      }, 4000);
                }
            })
        }).catch((e)=>
        setNotify({
            isOpen: true,
            message: e.Message,
            type: 'error'
        }));
        
         
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)        
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
                    <div className={classes.loadericon}>
                         {loader}
                    </div>
                </Toolbar>
                
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.TicketID}>
                                    <TableCell align='center'>{item.TicketID}</TableCell>
                                    <TableCell align='center'> {item.CustName}</TableCell>
                                    <TableCell align='center'>{item.ServiceReqDate.split("T")[0].split("-").reverse().join("-")}</TableCell>
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
                                        color='secondary'                        
                                            onClick={() => { 
                                                openInPopup(item)                                                 
                                                localStorage.setItem("status",item.Status);
                                            }}>
                                            <Tooltip title="Edit ticket" >
                                                    <EditOutlinedIcon fontSize="small" />
                                                 </Tooltip>
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="chat" 
                                            onClick={() => {                                               
                                                localStorage.setItem("ticketID",item.TicketID);
                                                history.push('/Chat');
                                            }}>
                                            <Tooltip title="Chat Window " >
                                                     <ChatIcon fontSize="small" />
                                                </Tooltip>
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