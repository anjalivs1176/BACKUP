import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Grid, TextField } from '@mui/material';


interface CouponFormValues {
  code: string,
  discountPercentage: number,
  validityStartDate: Dayjs | null,
  validityEndDate: Dayjs | null,
  minimumOrderValue: number
}

const AddNewCouponForm = () => {

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0
    },
    onSubmit: (values) => {

      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString()
      }
      console.log("Form submitted", values, formattedValues)
    }
  })
  return (
    <div>
      <h1 className='text-2xl font-bold text-primary-color pb-5 text-center'>Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="code"
                label="coupon code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="discountPercentage"
                label="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                onChange={(newValue) => formik.setFieldValue("validityStartDate", newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    onBlur: formik.handleBlur,
                    error: formik.touched.validityStartDate && Boolean(formik.errors.validityStartDate),
                    helperText: formik.touched.validityStartDate && formik.errors.validityStartDate
                  }
                }}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="Validity End Date"
                value={formik.values.validityEndDate}
                onChange={(newValue) => formik.setFieldValue("validityEndDate", newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    onBlur: formik.handleBlur,
                    error: formik.touched.validityEndDate && Boolean(formik.errors.validityEndDate),
                    helperText: formik.touched.validityEndDate && formik.errors.validityEndDate
                  }
                }}
              />

            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Button variant='contained' fullWidth sx={{py:".8rem"}}>Create Coupon</Button>
            </Grid>
          </Grid>
        </Box>

      </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm