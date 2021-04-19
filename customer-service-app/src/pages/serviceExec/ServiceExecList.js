import React, { useState, useEffect } from 'react'
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
    { id: 'serviceExId', label: 'ServiceExID' },
    { id: 'reviewerId', label: 'ReviewerID' },
    { id: 'Product', label: 'Product' },
    { id: 'Priority', label: 'Priority' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Chat', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customerID ,setCustomerID] = useState("");
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
        Client.get("/api/TicketsServiceExec").then(res=>{
              setRecords(res.data.map(x => ({
                ...x,
                Product: products[x.ProductID - 1].title,
                Priority: priorities[x.PriorityId - 1].title,
              })))
              
            console.log(res.data)
        })
          .catch((error) => {
            console.log(error);
          })
    }

    useEffect(() => {
        displayTickets()
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
                                (<TableRow key={item.TicketID}>
                                    <TableCell align='center'>{item.TicketID}</TableCell>
                                    <TableCell align='center'> {item.CustName}</TableCell>
                                    <TableCell align='center'>{item.ServiceReqDate}</TableCell>
                                    <TableCell align='center'>{item.ServiceExecId}</TableCell>
                                    <TableCell align='center'>{item.ReviewerId}</TableCell>
                                    <TableCell align='center'>{item.Product}</TableCell>
                                    <TableCell align='center'>{item.Priority}</TableCell>
                                    <TableCell align='center'>
                                        <div className={item.Status=='Open'? classes.statusCellOpen : classes.statusCellClosed} align='center' >{item.Status} </div> 
                                    </TableCell>
                                    <TableCell align='center'>
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
            <SnackBar notify={notify} setNotify={setNotify} />
        </>
    )
}