import React, {useState,useContext, useEffect} from 'react';
import DialogForm from '../DialogForm'
import UserContext from '../../contexts/UserContext'
import UserPrivacy from './UserPrivacy'
import UserVerification from './UserVerification'
import UserQRCode from './UserQRCode'
import UserSymptoms from './UserSymptoms'
const UserQr = ({open, setOpen, id}) => {
  const userContext = useContext(UserContext);
  const content1 = "We at PHTrace are advocates of data privacy, and ensure that we will only require what is completely necessary for the application to perform its functions. No information will be collected from our users until they have agreed to the terms and conditions provided in our privacy policy and have given their consent. We ask users to answer a brief Health Declaration Checklist and report if they are experiencing any common symptoms of COVID-19."
  const content2 = "Provide your phone number below to verify"
  const content3 = "Please Check your SMS and enter the code given to you"
  const [page, setPage] = useState(1)
  const [state, setState] = useState(1)
  useEffect(() => {
    if(open===false)
      setPage(1)
  },[open])
  if(page===1){
    return(
      <div>
        <DialogForm open={open} setOpen={setOpen} title={'WHAT INFORMATION WE COLLECT'} content={content1}>
          <UserPrivacy setPage={setPage} setOpen={setOpen}/>
        </DialogForm>
      </div>
      )
    }
  else if(!userContext.user.phone_verified){
    return(
      <div>
        <DialogForm open={open} setOpen={setOpen} title={'Verification of Phone Number'} content={state===1 ? content2 : content3}>
          <UserVerification setPage={setPage} setOpen={setOpen} state={state} setState={setState}/>
        </DialogForm>
      </div>
    )
  }
  else if((page ===2 && userContext.user.phone_verified) || page ===3) {
    return(
      <div>
        <DialogForm open={open} setOpen={setOpen} title={'Do you experience any of the following'} content={null}>
          <UserSymptoms setPage={setPage} setOpen={setOpen}/>
        </DialogForm>
      </div>
    )
  }
  else if(page==4){
    return(
      <div>
        <DialogForm open={open} setOpen={setOpen} title={'Your QR Code'} content={'You can download it or take a screenshot'}>
          <UserQRCode user={userContext.user}/>
        </DialogForm>
      </div>
    )
  }
    else{
      return null
    }
}

export default UserQr;