import React, { useState, useEffect } from 'react'
import PageHeader from "../../components/PageHeader";
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import {  useHistory } from 'react-router-dom';
import * as EmpTicketService from "../../services/EmpTicketService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import Client from '../../services/api/Client'
import SnackBar from'../../components/SnackBar'
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';
import useFullPageLoader from '../../components/useFullPageLoader'

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
    { id: 'name', label: 'Customer Name' },
    { id: 'date', label: 'Date' },
    { id: 'Product', label: 'Product' },
    { id: 'Priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Chat', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const history = useHistory();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [loader, showLoader, hideLoader] = useFullPageLoader();
   

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const displayTickets=()=>{
        showLoader();
        let products= EmpTicketService.getProductCollection();
        let priorities = EmpTicketService.getPriorityCollection();
        Client.get("/api/TicketsServiceExec").then(res=>{
                hideLoader();
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
                Priority: priorities[x.PriorityId - 1].title,
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

    return (
        <>
            <PageHeader
                title="Ticket List"
                subTitle="For Service Executive"
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
                                    <TableCell align='center'>{item.CustName}</TableCell>
                                    <TableCell align='center'>{item.ServiceReqDate.split("T")[0].split("-").reverse().join("-")}</TableCell>
                                    <TableCell align='center'>{item.Product}</TableCell>
                                    <TableCell align='center'>{item.Priority}</TableCell>
                                    <TableCell align='center'>
                                        <div className={item.Status==='Open'? classes.statusCellOpen : classes.statusCellClosed} align='center' >{item.Status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>
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
            <SnackBar notify={notify} setNotify={setNotify} />
        </>
    )
}