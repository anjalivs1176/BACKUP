// File: src/components/seller/BecomeSellerFormStep4.tsx
import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <Box>
      <Grid container spacing={3}>

        <Grid size={{ xs:12}}>
          <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails?.businessName || ""}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <TextField
            fullWidth
            name="sellerName"
            label="Seller Name"
            value={formik.values.sellerName || ""}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email || ""}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik.values.password || ""}
            onChange={formik.handleChange}
          />
        </Grid>

      </Grid>
    </Box>
  );
};

export default BecomeSellerFormStep4;