import { Box, Button, Container, Stack, Step, StepButton, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddDate from './addDate/AddDate'
import AddResInfo from './addResInfo/AddResInfo'
import { useValue } from '../../context/ContextProvider'
import { Send } from '@mui/icons-material'
import { createReservation } from '../../actions/reservation'
import PaymentField from './addPayment/PaymentField'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const AddReservations = () => {
    const {state:{resDetails, dateRange, currentUser,gear},dispatch} = useValue();
    const [activeStep, setActiveStep] = useState(0)
    const [steps, setSteps] = useState([
        {label:'Date Range', completed:false},
        {label:'Details', completed:false},
        {label:'Payment', completed:false},
    ]);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PL_KEY);
    // Calculate the total price based on the selected date range and gear price
    const calculateTotalPrice = () => {
        if (dateRange[0] && dateRange[1]) {
            const start = new Date(dateRange[0]);
            const end = new Date(dateRange[1]);
            console.log("Start date:", start, start.getTime());
            console.log("End date:", end, end.getTime());
            const timeDifference = Math.abs(end.getTime() - start.getTime()); // Use getTime() to get milliseconds
            console.log("Time difference:", timeDifference);
            const rentalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            console.log("Rental days:", rentalDays);
            return rentalDays * gear?.price;
        } else if (dateRange[0]) {
            // Handle the case when only one date is selected
            // Set totalPrice as gear price for a single day
            return gear?.price;
        }
        return 0; // Return 0 if no dates are selected
    };
    // Calculate total price
    const totalPrice = calculateTotalPrice() + gear?.price;

    // state for the subit button 
    const [showSubmit, setShowSubmit] = useState(false); // meanis that submit is not appearing 

    const checkDisabledState = ()=>{
        if(activeStep < steps.length -1 ) return false  // checks if the active steps if 0 stops execution 
        const index = findUnfinished // if lat step find index if any of the steps are not completed 
        if(index !== -1 ) return false // if all steps completed function returns -1 is not equal to not -1 then not finished 
        return true // if index =1 then finished to diable next function 
    }

    const findUnfinished = ()=>{
        return steps.findIndex(step => !step.completed) // if lat step find index if any of the steps are not completed
    }

    const handleNextState = ()=>{
        if(activeStep < steps.length -1 ){
                setActiveStep(activeStep => activeStep+ 1) // adding plus one to move to next step 
        }else {
            const stepIndex = findUnfinished() // incase last step functionused returns index of first unfineds step sets to actver step
            setActiveStep(stepIndex)
        }
    }
    useEffect(() => {
        // Check if the date range is valid
        if (dateRange[0] && dateRange[1]) {
            // If the date range is selected, mark the first step as completed
            if (!steps[0].completed) setComplete(0, true);
        } else {
            // If the date range is not selected, mark the first step as incomplete
            if (steps[0].completed) setComplete(0, false);
        }
    }, [dateRange]);

    useEffect(()=>{
        if(resDetails.phone.length > 5 && resDetails.purpose.length > 4 && resDetails.addinfo.length > 4 ){
            if(!steps[1].completed) setComplete(1,true)
        }else{
            if(steps[1].completed) setComplete(1, false)
        }   
    },[resDetails]);
    const setComplete = (index, status) =>{
        setSteps((steps)=>{
            steps[index].completed = status;
            return[...steps]
        });
    };

    useEffect(()=>{
        // check if all steps are completed  then function returns 1
        if(findUnfinished() ===-1){// this means that all the steps ahve been completed 
            if(!showSubmit) setShowSubmit(true)
        }else {
            if(showSubmit) setShowSubmit(false) // if the steps are not completed the state is false 
        }
    },[steps])

    // this handle the compeltion of the reservation 
    const handleSubmit = (paymentMethod)=>{
        const formattedPaymentMethod = {
            // Format the payment method object as expected by createReservation
            id: paymentMethod.id,
            brand: paymentMethod.brand,
            last4: paymentMethod.last4,
            exp_month: paymentMethod.exp_month,
            exp_year: paymentMethod.exp_year,
            // Add more properties if needed
        };
        const reservation = {
                phone: resDetails.phone,
                purpose: resDetails.purpose,
                addinfo: resDetails.addinfo,
                startDate: dateRange[0],
                endDate: dateRange[1],
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                gearId: gear?._id // Pass the gear ID here
        };
        console.log('Payment method in add',formattedPaymentMethod)
        console.log('gearid add',gear?._id)
        createReservation(reservation, currentUser, formattedPaymentMethod, dispatch)
    };

  return (
    // container centeralises compnments within the page 
    <Container sx={{my:4}}>
        <Stepper
            alternativeLabel // labels under the stepper
            nonLinear // flexiable stepper
            activeStep={activeStep}
            sx={{mb:3}}
        >
            {steps.map((step, index)=>(
                <Step
                    key={step.label} 
                    completed={step.completed}
                >
                    <StepButton onClick={()=>setActiveStep(index)}>
                        {step.label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
        {/**Box componment containing the steps inside the curly bracets is a switch case */}
        <Box 
            sx={{ //65b7cdee5240c1433c4a8689 bike cycle // 65b7cdee5240c1433c4a8689 motorbike // 65c3fee564a409ca8adf5ced 65b7cdee5240c1433c4a8689 
                pb:7,
            }}
        > 
            {{
                0: <AddDate gearId={gear?._id}/>,  // if 0 the date range will show up 
                1: <AddResInfo/>, // if 1 the reservation info wil show up
                2:  <Elements stripe={stripePromise}><PaymentField handleSubmit={handleSubmit}/></Elements>
            }[activeStep]} {/**switch state depends on the active step */}
        <Stack
            direction="row"
            sx={{pt:2,  justifyContent:'space-around'}}
        >
            <Button
                color='inherit'
                disabled={!activeStep}  // if 0 then disabled 
                onClick={()=>setActiveStep(activeStep=>activeStep-1)} // set active set to minus one when next clicked 
            >
                Back
            </Button>
            <Button
                disabled={checkDisabledState()} // disabled is controled by function invkes with every render 
                onClick={handleNextState}
            >
                Next
            </Button>
        </Stack>
        {showSubmit && (
            <Stack
                sx={{alignItems:'center', pt:4}}
            >
                <Button
                    variant='contained'
                    endIcon={<Send/>}
                    onClick={handleSubmit}
                >Submit</Button>
            </Stack>
        )}
        <Stack direction="row"
            sx={{pt:4,  justifyContent:'space-around'}}>
            <Typography variant="subtitle1" sx ={{ border: '2px solid #0E86D4', padding: '8px', borderRadius: '8px'}}>
                Total Price: €{totalPrice}
            </Typography>
        </Stack>
        </Box>
    </Container>
  )
}

export default AddReservations;