// import React, { useState } from 'react'
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { Box, Button, Typography } from '@mui/material';
// import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
// import { useFormik } from 'formik';
// import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
// import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
// import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

// const steps = [
//     "Tax Details & Mobile",
//     "Pickup Address",
//     "Bank Details",
//     "Supplier Details"
// ];

// const SellerAccountForm = () => {
//     const [activeStep, setActiveStep] = useState(0);

//     const handleStep = (value: number) => {

//         // 👉 If last step and user clicks continue → create account
//         if (activeStep === steps.length - 1 && value === 1) {
//             handleCreateAccount();
//             console.log("active step:", activeStep);
//             return;
//         }

//         // 👉 Normal step update
//         setActiveStep(activeStep + value);

//         // 👉 This log now prints correctly AFTER update logic
//         console.log("active step:", activeStep + value);
//     }

//     const handleCreateAccount = () => {
//         console.log("Created Account");
//     }

//     const formik = useFormik({
//         initialValues:{
//             mobile:"",
//             otp:"",
//             gstin:"",
//             pickupAddress:{
//                 name:"",
//                 mobile:"",
//                 pincode:"",
//                 address:"",
//                 locality:"",
//                 city:"",
//                 state:"",
//             },
//             bankDetails:{
//                 accountNumber:"",
//                 ifscCode:"",
//                 accountHolderName:"",
//             },
//             sellerName:"",
//             email:"",
//             businessDetails:{
//                 businessName:"",
//                 businessEmail:"",
//                 businessMobile:"",
//                 logo:"",
//                 banner:"",
//                 businessAddress:""
//             },
//             password:""
//         },
//         onSubmit:(values)=>{
//             console.log(values,"formik submitted");
//         }
//     })

//     return (
//         <div>
//             <Stepper activeStep={activeStep} alternativeLabel>
//                 {steps.map((label, index) => (
//                     <Step key={label}>
//                         <StepLabel>{label}</StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>

//             <section className='mt-20 space-y-10'>
//                 <div>
//                     {activeStep==0?<BecomeSellerFormStep1 formik={formik}/>: activeStep==1? <BecomeSellerFormStep2 formik={formik} />: activeStep==2? <BecomeSellerFormStep3 formik={formik}/> : activeStep==3? <BecomeSellerFormStep4 formik={formik}/> :" "}    
//                 </div>
                

//                  <div className='flex items-center justify-between'>
//                 <Button
//                     onClick={() => handleStep(-1)}
//                     variant='contained'
//                     disabled={activeStep === 0}
//                 >
//                     Back
//                 </Button>

//                 <Button
//                     onClick={() => handleStep(1)}
//                     variant='contained'
//                 >
//                     {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
//                 </Button>
//             </div>
//             </section>

           
//         </div>
//     )
// }

// export default SellerAccountForm;



import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useNavigate } from "react-router-dom";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // 🟢 FORM STRUCTURE EXACTLY MATCHING BACKEND
//   const formik = useFormik({
//     initialValues: {
//       sellerName: "",
//       mobile: "",
//       email: "",
//       password: "",

//       GSTIN: "",

//       pickupAddress: {
//         name: "",
//         locality: "",
//         address: "",
//         city: "",
//         state: "",
//         pinCode: "",
//         mobile: "",
//       },

//       businessDetails: {
//         businessName: "",
//         businessType: "",
//         panNumber: "",
//         businessAddress: "",
//         tradeName: "",
//       },

//       bankDetails: {
//         accountHolderName: "",
//         accountNumber: "",
//         ifscCode: "",
//         bankName: "",
//         branchName: "",
//       },
//     },

//     onSubmit: () => {},
//   });


const formik = useFormik({
  initialValues: {
    sellerName: "",
    mobile: "",
    email: "",
    password: "",
    GSTIN: "",

    pickupAddress: {
      name: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      mobile: ""
    },

    businessDetails: {
      businessName: "",
      businessType: "",
      panNumber: "",
      businessAddress: "",
      tradeName: ""
    },

    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: ""
    }
  },
  onSubmit: (values) => handleCreateAccount(values)
});


  // 🟢 FINAL SUBMISSION → HIT BACKEND API
const handleCreateAccount = async (values: any) => {
  try {
    const res = await fetch("http://localhost:8080/seller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log("SELLER CREATED:", data);

    // alert("Seller account created! Please verify OTP.");

    // Move to OTP page if you want
    // navigate("/seller/verify", { state: { email: formik.values.email } });
    // after successful response (Seller created)
alert("Seller account created! Check your email for the verification link (it contains the OTP).");



  } catch (error) {
    console.log("Error creating seller:", error);
    alert("Signup failed");
  }
};


  const handleStep = (value: number) => {
    if (activeStep === steps.length - 1 && value === 1) {
      formik.handleSubmit();
      return;
    }

    setActiveStep(activeStep + value);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
          {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
          {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
          {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>

          <Button
            onClick={() => handleStep(1)}
            variant="contained"
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;

