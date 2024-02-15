import React , { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function CustomAlert(props) {

    let { alertMessage } = props;

    const [open, setOpen] = useState(alertMessage);
    
    function handleClose() { 
        setOpen(false);
    }

    return(
        <div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} size="lg" >
                <MuiAlert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ fontSize: "14pt" , height: "60px" ,width: '100%' }}
                >
                    { alertMessage }
                </MuiAlert>
            </Snackbar>
        </div>
    )


}