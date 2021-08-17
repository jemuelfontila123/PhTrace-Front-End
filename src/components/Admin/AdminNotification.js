import React ,{useState, useEffect} from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const AdminNotification = ({userContext}) => {
    const [open, setOpen] = useState([])
    const {notifications} = userContext.user;
    const classes = useStyles();
    useEffect(() => {
    },[])
    const removeNotification = async id => {
     await userContext.removeNotification(id)
    }
    return(
        <div className={classes.root}>
        {userContext.user.notifications.map((notification,index) => {
          return(
          <Alert variant="outlined" key={index} severity="warning" onClose={() => removeNotification(notification.id)} >
            <AlertTitle>He/she was detected in the DOH API!</AlertTitle>
              {notification.message}
          </Alert>
          )}
        )}
      </div>
    )
}



export default AdminNotification;