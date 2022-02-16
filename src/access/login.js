import React,{useEffect,useState} from "react";
import {makeStyles} from "@mui/styles";
import {FormControl,FormControlLabel,TextField,Divider, Checkbox, Button,Backdrop,Snackbar,CircularProgress,Alert} from "@mui/material";
import {Route} from "react-router-dom";
// import dashboard from "../utils/images/data-visualization.png";
import dashboard from "../utils/images/dashboard.jpg";
import {signIn} from "../utils/api-service";
const useStyles = makeStyles((theme) => ({
    main : {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
    },
    landing: {
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        overflow: "auto",
      },
      logo : {
          display:"flex",
          flex:7,
      },
      login : {
        display:"flex",
        justifyContent:"center",
        alignContent : "center",
        alignItems:"center",
        flex:3,
        // backgroundColor:"#1976d2",
        flexDirection:"column",
        padding:"10px",
      },
      loginText : {
        display:"flex",
        flexShrink:1,
        justifyContent:"center"
      },
      textfields:{
          display:"flex",
          flexDirection:"column",
          flex:10,
          width:"100%",
          gap:"0.8rem",
      }
    
}))

export const Login = (props) => {

    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rememberMe,setRemember] = useState(true);
    const [emailValid,setEmailValid] = useState(true);
    const [openbackdrop,setOpenBackDrop] = useState(false);
    const [openSnack,setOpenSnack] = useState(false);

    const checkValidMail = (mail) => {
        return !! mail.match(/.+@.+/);
    }
    

    const handleLogin = async() => {
        setOpenBackDrop(true);
        let payload = {email,password,rememberMe}
        let result = await signIn(payload);
        console.log('result in login',result);
        if(result){
            setOpenBackDrop(false);
            localStorage.setItem("x-auth-token",result.token)
            props.history.push('/dashboard');
        }
        else {
            console.log('else')
            setOpenBackDrop(false);
            setOpenSnack(true);
            setTimeout(() => {
                setOpenSnack(false)
            },6000)
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        let valid = checkValidMail(e.target.value);
        valid ? setEmailValid(true) : setEmailValid(false);
    }
    return (
    <div className={classes.main}>
        <div className={classes.landing}>
            <Route
            render={(props) => (
                <>
                <div className={classes.logo}>
                    <img src = {dashboard} style={{maxWidth:"100%",height:"100%"}} alt="dashboard"/>
                </div>
                <div className={classes.login}>
                    <div className = {classes.loginText}>
                        <h3>Login</h3>
                        <Divider />
                    </div>

                    <div className={classes.textfields}>
                        <TextField 
                            variant="outlined" 
                            fullWidth = {true} 
                            size="small" 
                            label = "Email" 
                            // type = "email"
                            value = {email}
                            onChange = {handleEmail} 
                            inputProps = {{
                                type : "email"
                            }}
                            error = {!emailValid}
                            helperText = {!emailValid ? "Enter valid email" : ""}
                        />
                        <TextField 
                            variant="outlined" 
                            fullWidth = {true} 
                            size="small" 
                            label = "Password" 
                            type="password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        <FormControl>
                            <FormControlLabel 
                                value="top"
                                control={<Checkbox color="primary" checked={rememberMe} onChange = {(e) => setRemember(e.target.checked)}/>}
                                label="Remember Me"
                                labelPlacement="end"
                            />
                        </FormControl>

                        <Button variant = "outlined" style ={{alignSelf:"flex-end",width:"10rem"}} size="medium" onClick={handleLogin} >Login</Button>
                        
                    </div>
                </div>
                </>
            )}            
            />
        </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,display:"flex",flexDirection:"column"}}
            open={openbackdrop}
        >
            <CircularProgress color="inherit" />
            <h5> Signing In...</h5>
        </Backdrop>
        <Snackbar open={openSnack} autoHideDuration={3000} anchorOrigin = { {vertical: "top", horizontal: "center" }}>
            <Alert  severity="error" sx={{ width: '100%',zIndex:10020  }}>
                Not a valid user
            </Alert>
        </Snackbar>
    </div>
    )
}