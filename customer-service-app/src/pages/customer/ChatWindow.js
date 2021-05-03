import React, { useState, useEffect } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {CssBaseline} from '@material-ui/core';
import NewCommentForm from "./NewCommentForm";
import StarIcon from '@material-ui/icons/Star';
import { MdHeadsetMic } from 'react-icons/md';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TicketForm from "./TicketForm";
import {IoPersonSharp} from 'react-icons/io5';
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import {BsFillPlusCircleFill} from 'react-icons/bs';
import "react-vertical-timeline-component/style.min.css";
import { Button, makeStyles } from '@material-ui/core';
import SnackBar from'../../components/SnackBar'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  dateText: {
      color:'black',
      maxWidth:theme.spacing(6)
  },
  dateTextWhite: {
    color:'white',
    maxWidth:theme.spacing(6)
},
}));

export default function ChatWindow(){
  const classes = useStyles();  
  const [records, setRecords] = useState([])
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const openInPopup = item => {
    setOpenPopup(true)
}
  return(
    <>
    <h3>This is a demo conversation between a customer and a service executive</h3>
    <h3 className="vertical-timeline-element-title" align='center'>30-04-2021</h3>
        <VerticalTimeline>        
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:08"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                My Laptop does not recognise my USB device!
            </p>
          </VerticalTimelineElement>

            <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:09"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p>
            Sorry for the inconvenience! I’m going to take care of this for you. Can you please provide me with your product model number? You will find it listed on a sticker on the bottom of your Laptop.
            </p>
          </VerticalTimelineElement>
          

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:10"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                Yeah sure! Here it is: 20U1-S06k54
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:12"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p> Thank you! Can you please tell us since when have you been facing this issue? </p>
          </VerticalTimelineElement>
          
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:13"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                It was working well until today. I tried to connect my gaming keyboard but the system didn't recognise the device. 
            </p>
          </VerticalTimelineElement> 
          
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:15"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p> That's not a problem Sir, let me help you. Please follow my instructions: 
                Use system keyboard during this process.
              <ul>
                <li> Search for "device managers" in the search tool next to your start button</li>
                <li> You will find a list of devices. Go to keyboard option and right-click on the keyboard you want to repair and choose "Uninstall." </li>
                <li> Now restart your system. When your computer boots up, Windows will detect your keyboard and install the driver. </li> 
              </ul> 
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:15"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                 Sure, I will do accordingly
            </p>
          </VerticalTimelineElement> 

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:16"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p> You can connect back to the same chat and let us know if the problem is resolved 
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:19"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                Thank you! It is working properly now.
            </p>
          </VerticalTimelineElement> 

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:19"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p> That's great. Is there anything else I can assist you with? 
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:20"
            position={ localStorage.getItem("role")=="customer"? 'right':'left'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<IoPersonSharp/>}
          >
            <h3 className="vertical-timeline-element-title" align='right'>Jake Peralta</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>Customer</h4>
            <p>
                No! Thanks, I am good.
            </p>
          </VerticalTimelineElement> 

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="15:21"
            position={ localStorage.getItem("role")=="customer"? 'left':'right'}
            dateClassName={localStorage.getItem("theme")=="true"? classes.dateText: classes.dateTextWhite}
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<MdHeadsetMic/>}
            >
            <h3 className="vertical-timeline-element-title" align='right'>Service Executive</h3>
            <h4 className="vertical-timeline-element-subtitle" align='right'>HelpDesk</h4>
            <p> Thank you for reaching out to us. If you find our information to be helpful, write a feedback! It helps us to not only improve our products and services but also to let others know that we care about delivering the best quality.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(89, 47, 130)', color: '#fff' }}
            icon={<Controls.ActionButton
              color='add'
              onClick={() => { 
                openInPopup()
              }}> 
              <Tooltip title="New Message" >
              <BsFillPlusCircleFill fontSize="medium" style={{marginTop:'9', marginBottom:'4.5'}}/>
              </Tooltip>           
           </Controls.ActionButton>}
            onClick={() => { 
              openInPopup()
               }}
          />
          
          

          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<StarIcon/>}
          />
          <Popup
                title="New Message"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
              <NewCommentForm
                    recordForEdit={recordForEdit}
              />
            </Popup>
      
    </VerticalTimeline>
    <SnackBar notify={notify} setNotify={setNotify} />
    <CssBaseline/>
</>
  )  
}