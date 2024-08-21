import React , { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function CustomAlert(props) {

    let { error, alertMessage } = props?.alertMessage || {};

    const [open, setOpen] = useState(props?.alertMessage ? true : false);

    
    useEffect(() => {
        setOpen(props.alertMessage);
    }, [props?.alertMessage]);


    
    function handleClose() { 
        setOpen(false);
    }

    return(
        <div>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} size="lg" >
                <MuiAlert
                    onClose={handleClose}
                    severity={ error ?  "error" : "success"}
                    variant="filled"
                    sx={{ fontSize: "14pt" , height: "60px" , width: '100%' }}
                >
                    { alertMessage }
                </MuiAlert>
            </Snackbar>
        </div>
    )


}