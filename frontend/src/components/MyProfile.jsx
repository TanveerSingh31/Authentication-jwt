import React, {useEffect, useState} from 'react';
import fetchTokenData from '../utils/fetchTokenData.js';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import SampleResponse from '../utils/SampleResponse.js';
import getInitials from '../utils/getInitials.js';
import Config from '../config.json';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';





export default function MyProfile(props){

    let { token } = props;
    let tokenData = fetchTokenData(token);
    let initials = getInitials(tokenData);

    let [ anchorEl, setAnchorEl ] = useState(null);         // if set to null the popover is not opened

    let [ userData, setUserData ] = useState({
            name: "",
            createdAt: "",
            email: "",
            tasksCreated: ""
    });

    useEffect(()=>{
        const getUserProfile = async () => {
            let result = await axios.get(`${Config.BASE_URL2}userProfile`, {
                params: {
                    userId: tokenData.userId
                }
            });
            console.log("===>",result);
            let { firstName: fName, lastName: lName, email, createdAt } = result?.data;
            setUserData({
                name: `${fName} ${lName}`, 
                email: email,
                createdAt: createdAt
            });
        }
        getUserProfile();
    }, []);

    let value = useSelector((state) => state.value.count);



    function handleClose(){
        setAnchorEl(null);
    }

    function handleClick(e){
        setAnchorEl(e.currentTarget);
    }

    let open = Boolean(anchorEl);

    return(
        <span className='profileIcon'>
            <Avatar onClick={handleClick} sx={{ bgcolor: "#01579b" }}>{initials}</Avatar>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <div>
                        <h3>{userData.name}</h3>
                        <h3>{userData.email}</h3>
                        <h3>joined on: {moment(userData.createdAt).format('Do MMMM, YYYY')}</h3>
                        <h3>Tasks Created till now: {value}</h3>
                    </div>
                </Typography>
            </Popover>
        </span>
    );

}


