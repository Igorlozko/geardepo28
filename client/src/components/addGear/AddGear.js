import { Box, Button, Container, Stack, Step, StepButton, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddLocation from './addLocation/AddLocation';
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';
import { useValue } from '../../context/ContextProvider';
import { Cancel, Send } from '@mui/icons-material';
import { clearGear, createGear, updateGear } from '../../actions/gear';
import { useNavigate } from 'react-router-dom';

// Adding gear on the website 
// 

const AddGear = () => {
    const {state:{images, details, location, currentUser, updatedGear, deletedImages, addedImages}, dispatch}= useValue();
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([
        // the steps for adding gear and the details, can add category 
        {label: 'Location', completed: false}, 
        {label: 'Details', completed: false},
        {label: 'Images', completed: false},
    ]);

    const [showSubmit, setShowSubmit] = useState(false);

    const handleNext = ()=>{
        if(activeStep < steps.length -1 ){
            setActiveStep(activeStep => activeStep + 1 )
        }else{
            const stepIndex = findUnfinished()
            setActiveStep(stepIndex)
        }
    };

    const checkDisabled = ()=>{
        if(!activeStep < steps.length -1 )return false
        const index = findUnfinished()
        if(index !== -1) return false
        return true
    };

    const findUnfinished = ()=>{
        return steps.findIndex(step => !step.completed)
    };

    useEffect(()=>{
        if(images.length){
            if(!steps[2].completed) setComplete(2, true);
        }else{
            if(steps[2].completed) setComplete(2, false);
        }
    },[images]);

    const setComplete = (index, status) => {
        setSteps(steps=>{
            steps[index].completed  = status
            return [...steps]; 
        })
    };
    useEffect(()=>{
        if(details.title.length >4 && details.description.length > 9){
            if(!steps[1].completed) setComplete(1, true);
        }else{
            if(steps[1].completed) setComplete(1, false);
        }
    },[details]);

    useEffect(()=>{
        if(location.lng ||  location.lat){
            if(!steps[0].completed) setComplete(0, true);
        }else{
            if(steps[0].completed) setComplete(0, false);
        }
    },[location]);

    useEffect(()=>{
        if(findUnfinished() === -1){
            if(!showSubmit) setShowSubmit(true)
        }else{
            if(showSubmit) setShowSubmit(false)
        }
    },[steps])

    const handleSubmit = ()=>{
        const gear = {
            lng: location.lng,
            lat: location.lat,
            price: details.price,
            title: details.title,
            description: details.description,
            images,
        };
        if(updatedGear) return updateGear(gear,currentUser, dispatch, updatedGear, deletedImages)
        createGear(gear, currentUser, dispatch );
    };

    const navigate = useNavigate();

    const handleCancel = ()=>{
        if(updatedGear){
            navigate('/admin/gears')
            clearGear(dispatch, currentUser, addedImages, updatedGear)
        }else{
            dispatch({type:'UPDATE_SECTION', payload:0})
            clearGear(dispatch, currentUser, images)
        }
    }

  return (
    <Container
        sx={{my:4}}
    >
        <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px" }}>Accounts which have been verified by the admin are allowed to create a listing.</p>
        </div>
        <Stepper
            alternativeLabel
            nonLinear
            activeStep={activeStep}
            sx={{mb:3}}
        >
            {steps.map((step, index) =>(
                <Step key={step.label}completed={step.completed}> 
                    <StepButton onClick={()=> setActiveStep(index)}>
                        {step.label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
        <Box
           sx ={{pb:7}} 
        >
                    {{
                        0:<AddLocation/>,
                        1:<AddDetails/>,
                        2:<AddImages/>,
                    }[activeStep]}
            
            <Stack
                direction='row'
                sx={{pt:2, justifyContent:'space-around'}}
            >
                <Button
                    color='inherit'
                    disabled= {!activeStep}
                    onClick={()=>setActiveStep(activeStep => activeStep -1)}
                >
                    Back
                </Button>
                <Button
                    disabled={checkDisabled()}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Stack>
            
                <Stack
                    sx={{alignItem:'center', justifyContent:'center', gap:2}} direction='row'
                >
                  {showSubmit && (  <Button
                        variant='contained'
                        endIcon={<Send/>}
                        onClick={handleSubmit}
                    >
                        {updatedGear? 'Update':'Submit'}
                    </Button>)}
                    <Button variant='outlined' endIcon={<Cancel/>} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Stack>
            
        </Box>
    </Container>
  )
}

export default AddGear