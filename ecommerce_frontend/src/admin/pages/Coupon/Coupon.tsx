// import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
// import React, { useState } from 'react'
// import { SelectChangeEvent } from '@mui/material/Select';
// import { styled } from '@mui/material/styles';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import { Delete } from '@mui/icons-material';


// const accountStatuses = [
//     {
//         status: 'PENDING_VERIFICATION',
//         title: 'Pending Verification',
//         description: 'The account is awaiting verification. User cannot access full features yet.'
//     },
//     {
//         status: 'ACTIVE',
//         title: 'Active',
//         description: 'The account is fully active and the user has full access.'
//     },
//     {
//         status: 'SUSPENDED',
//         title: 'Suspended',
//         description: 'The account is temporarily suspended due to policy violations or issues.'
//     },
//     {
//         status: 'DEACTIVATED',
//         title: 'Deactivated',
//         description: 'The user has deactivated their account voluntarily.'
//     },
//     {
//         status: 'BANNED',
//         title: 'Banned',
//         description: 'The account has been banned permanently due to serious violations.'
//     },
//     {
//         status: 'CLOSED',
//         title: 'Closed',
//         description: 'The account has been permanently closed and cannot be reactivated.'
//     }
// ]


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
// //   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(
//   couponCode: string,
//   startDate: string,
//   endDate: string,
//   minOrderValue: string,
//   discountPercent: string,
//   Status: string,
//   Delete:string
// ) {
//   return { couponCode,startDate,endDate,minOrderValue,discountPercent,Status,Delete};
// }

// const rows = [
//   createData('ZOSH34','2025-11-15','2025-11-25','500','50','Active','')
// ];

// const Coupon = () => {
//     const [selectedStatus, setSelectedStatus] = useState("ACTIVE")

//     const handleChange = (event: SelectChangeEvent) => {
//         setSelectedStatus(event.target.value)
//     };

//     return (
//         <>
//             <div className='pb-5 w-60'>
//                 <FormControl fullWidth>
//                     <InputLabel id="account-status-label">Account Status</InputLabel>
//                     <Select
//                         labelId="account-status-label"
//                         id="account-status-select"
//                         value={selectedStatus}
//                         label="Account Status"
//                         onChange={handleChange}
//                     >
//                         {accountStatuses.map((item) => (
//                             <MenuItem key={item.status} value={item.status}>
//                                 {item.title}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </div>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Coupon Code</StyledTableCell>
//                             <StyledTableCell >Start Date</StyledTableCell>
//                             <StyledTableCell align="right">End Date</StyledTableCell>
//                             <StyledTableCell align="right">Min Order Value</StyledTableCell>
//                             <StyledTableCell align="right">Discount %</StyledTableCell>
//                             <StyledTableCell align="right">Status</StyledTableCell>
//                             <StyledTableCell align="right">Delete</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row) => (
//                             <StyledTableRow key={row.couponCode}>
//                                 <StyledTableCell component="th" scope="row">
//                                     {row.couponCode}
//                                 </StyledTableCell>
//                                 <StyledTableCell >{row.startDate}</StyledTableCell>
//                                 <StyledTableCell align="right">{row.endDate}</StyledTableCell>
//                                 <StyledTableCell align="right">{row.minOrderValue}</StyledTableCell>
//                                 <StyledTableCell align="right">{row.discountPercent}</StyledTableCell>
//                                 <StyledTableCell align="right">{row.Status}</StyledTableCell>
//                                 <StyledTableCell align="right" style={{ color: '#00927c', }}>
//                                     <Button>
//                                       <Delete/>
//                                     </Button>
//                                 </StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>

//     )
// }

// export default Coupon



// import {
//     Button,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Paper,
//     Select,
//     Table,
//     TableBody,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { SelectChangeEvent } from "@mui/material/Select";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Delete } from "@mui/icons-material";
// import { adminApi } from "../../services/adminApi";

// // Whatever status filter you want (optional)
// const accountStatuses = [
//     { status: "ACTIVE", title: "Active" },
//     { status: "EXPIRED", title: "Expired" },
//     { status: "DISABLED", title: "Disabled" },
// ];

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//         backgroundColor: theme.palette.action.hover,
//     },
//     "&:last-child td, &:last-child th": {
//         border: 0,
//     },
// }));

// const Coupon = () => {
//     const [selectedStatus, setSelectedStatus] = useState<string>("");
//     const [coupons, setCoupons] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (event: SelectChangeEvent) => {
//         setSelectedStatus(event.target.value as string);
//     };

//     // Fetch coupons
//     const fetchCoupons = async () => {
//         try {
//             setLoading(true);
//             const res = await adminApi.getCoupons();
//             setCoupons(res.data);
//             console.log("coupons",res.data);
//         } catch (e) {
//             console.error("ERROR fetching coupons:", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCoupons();
//     }, []);

//     // Delete coupon
//     const deleteCoupon = async (id: number) => {
//         try {
//             await adminApi.deleteCoupon(id);
//             fetchCoupons();
//         } catch (err) {
//             console.error("Error deleting coupon:", err);
//         }
//     };

//     return (
//         <>
//             {/* Filter - optional */}
//             <div className="pb-5 w-60">
//                 <FormControl fullWidth>
//                     <InputLabel id="coupon-status-label">Status</InputLabel>
//                     <Select
//                         labelId="coupon-status-label"
//                         id="coupon-status-select"
//                         value={selectedStatus}
//                         label="Status"
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="">
//                             <em>All</em>
//                         </MenuItem>
//                         {accountStatuses.map((item) => (
//                             <MenuItem key={item.status} value={item.status}>
//                                 {item.title}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </div>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Coupon Code</StyledTableCell>
//                             <StyledTableCell>Start Date</StyledTableCell>
//                             <StyledTableCell align="right">End Date</StyledTableCell>
//                             <StyledTableCell align="right">Min Order Value</StyledTableCell>
//                             <StyledTableCell align="right">Discount %</StyledTableCell>
//                             <StyledTableCell align="right">Status</StyledTableCell>
//                             <StyledTableCell align="right">Delete</StyledTableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {loading ? (
//                             <StyledTableRow>
//                                 <StyledTableCell colSpan={7} align="center">
//                                     <CircularProgress size={24} />
//                                 </StyledTableCell>
//                             </StyledTableRow>
//                         ) : coupons.length === 0 ? (
//                             <StyledTableRow>
//                                 <StyledTableCell colSpan={7} align="center">
//                                     No coupons found
//                                 </StyledTableCell>
//                             </StyledTableRow>
//                         ) : (
//                             coupons
//                                 .filter((c) =>
//                                     selectedStatus
//                                         ? (c.active ? "ACTIVE" : "INACTIVE") === selectedStatus
//                                         : true
//                                 )
//                                 .map((row: any) => (
//                                     <StyledTableRow key={row.id}>
//                                         <StyledTableCell>{row.code}</StyledTableCell>
//                                         <StyledTableCell>{row.validityStratDate}</StyledTableCell>
//                                         <StyledTableCell align="right">{row.validityEndDate}</StyledTableCell>
//                                         <StyledTableCell align="right">{row.minimumOrderValue}</StyledTableCell>
//                                         <StyledTableCell align="right">{row.discountPercentage}</StyledTableCell>
//                                         <StyledTableCell align="right">
//                                             {row.active ? "ACTIVE" : "INACTIVE"}
//                                         </StyledTableCell>

//                                         <StyledTableCell align="right" style={{ color: "#00927c" }}>
//                                             <Button onClick={() => deleteCoupon(row.id)}>
//                                                 <Delete />
//                                             </Button>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                 ))

//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// };

// export default Coupon;




import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Delete } from "@mui/icons-material";
import { adminApi } from "../../services/adminApi";

const accountStatuses = [
  { status: "ACTIVE", title: "Active" },
  { status: "INACTIVE", title: "Inactive" }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Coupon = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getCoupons();
      setCoupons(res.data);
    } catch (e) {
      console.error("ERROR fetching coupons:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const deleteCoupon = async (id: number) => {
    try {
      await adminApi.deleteCoupon(id);
      fetchCoupons();
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="coupon-status-label">Status</InputLabel>
          <Select
            labelId="coupon-status-label"
            id="coupon-status-select"
            value={selectedStatus}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell align="right">End Date</StyledTableCell>
              <StyledTableCell align="right">Min Order Value</StyledTableCell>
              <StyledTableCell align="right">Discount %</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </StyledTableCell>
              </StyledTableRow>
            ) : coupons.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  No coupons found
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              coupons
                .filter((c) =>
                  selectedStatus
                    ? (c.active ? "ACTIVE" : "INACTIVE") === selectedStatus
                    : true
                )
                .map((row: any) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.code}</StyledTableCell>
                    <StyledTableCell>{row.validityStratDate}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.validityEndDate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.minimumOrderValue}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.discountPercentage}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.active ? "ACTIVE" : "INACTIVE"}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Button onClick={() => deleteCoupon(row.id)}>
                        <Delete />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Coupon;
