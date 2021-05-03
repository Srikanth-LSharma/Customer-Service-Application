import React, { useState, useEffect } from 'react'
import TicketForm from "./TicketForm";
import {  useHistory } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import useFullPageLoader from '../../components/useFullPageLoader'
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ConfirmDialog from "../../components/ConfirmDialog";
import Client from '../../services/api/Client'
import SnackBar from'../../components/SnackBar'
import ChatIcon from '@material-ui/icons/Chat';
import DarkTheme,{createTheme} from 'react-dark-theme'
import Tooltip from '@material-ui/core/Tooltip';

const lightTheme = {
    background: '#c5cae965',
    text:'black'
  }
   
  const darkTheme = {
    background: '#424040',
    text: '#FFFFFF',
  }
  const myTheme = createTheme(darkTheme, lightTheme)

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
    loadericon:{
        position:'absolute',
        top:'230%',
        right:'45%',
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
    outerdiv:{        
        margin: theme.spacing(0),
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
    const history = useHistory();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customerID ,setCustomerID] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [servID, setServID] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader();
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
        showLoader();
        Client.get("/api/CustomerTickets").then(res=>{
                hideLoader();
              setRecords(res.data)
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
              })))
            console.log(res.data)
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

    const addOrEdit = (ticket, resetForm) => {
        const data = {
            ProdID: Number(ticket.ProductID),
            PriorityID: 3
        };
        if (ticket.TicketID == 0){      
            console.log("Ticket:",data);
            showLoader();
            Client.post('/api/AddTicket',data).then(
                response =>{
                    hideLoader();
                    displayTickets()
                       console.log("Accepted input",response.data)
                       setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                }).catch((e)=>{
                    hideLoader();
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
        }
            
        else{
            showLoader();
            Client.get('/api/CustTicket/'+ticket.TicketID).then(
            response =>{
                   console.log("Ticket details:",response.data)
                   setServID(Number(response.data.ServiceExecId));
                   setRevID(Number(response.data.ReviewerId));
                   setPrioID(Number(response.data.PriorityId));
                   
                   const editdata={
                        TicketID: Number(ticket.TicketID),
                        ServiceReqDate: ticket.ServiceReqDate,
                        CustID: Number(customerID),
                        ProdID: Number(ticket.ProductID),
                        ServiceExecID: Number(response.data.ServiceExecId),
                        ReviewerID:  Number(response.data.ReviewerId),
                        PriorityID:  Number(response.data.PriorityId),
                        Feedback: ticket.Feedback,
                        Status: ticket.Status
                    }
                    Client.put('/api/EditCustTicket/'+editdata.TicketID,editdata).then(
                    response =>{
                        hideLoader();
                        displayTickets()
                        console.log("Accepted input",response.data)
                        setNotify({
                            isOpen: true,
                            message: 'Submitted Successfully',
                            type: 'success'
                        })
                    }).catch((e)=>{
                        hideLoader();
                        setNotify({
                            isOpen: true,
                            message: "Your ticket must be reviewed before it can be edited",
                            type: 'error'
                        })
                    })
                    //console.log("Ticket Edit Data:",editdata)
                   //console.log("servID:",servID,"revID:",revID,"PrioID",prioID)
            }).catch((e)=>{
                hideLoader();
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
        }            
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)        
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const openChat = () =>{
        
    }

    {/*const onDelete = id => {
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
    }*/}

    return (
        <div className={classes.outerdiv}>
            <PageHeader
                title="Ticket List"
                subTitle="Form design with validation"
                icon={<RateReviewTwoToneIcon fontSize="medium" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar >
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
                    <div className={classes.loadericon}>
                         {loader}
                    </div>
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
                                    <TableCell align='center'>{item.ServiceReqDate.split("T")[0].split("-").reverse().join("-")}</TableCell>                                   
                                    <TableCell align='center'>{item.Product}</TableCell>                                    
                                    <TableCell>
                                        <div  align='center' className={item.Status=='Open'? classes.statusCellOpen : classes.statusCellClosed} >{item.Status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>{item.Feedback}</TableCell>
                                    <TableCell align='center'>
                                    
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => { 
                                                openInPopup(item)
                                                localStorage.setItem("status",item.Status);
                                                 }}>
                                                 <Tooltip title="Edit ticket" aria-label="add">
                                                    <EditOutlinedIcon fontSize="small" />
                                                 </Tooltip>
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
                                            color="chat" 
                                            onClick={() => {                                               
                                                localStorage.setItem("ticketID",item.TicketID);
                                                history.push('/Chat');
                                            }}>
                                                <Tooltip title="Chat Window " aria-label="add">
                                                     <ChatIcon fontSize="small" />
                                                </Tooltip>
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
        </div>
    )
}