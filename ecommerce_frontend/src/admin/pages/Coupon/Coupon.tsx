import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Delete } from '@mui/icons-material';


const accountStatuses = [
    {
        status: 'PENDING_VERIFICATION',
        title: 'Pending Verification',
        description: 'The account is awaiting verification. User cannot access full features yet.'
    },
    {
        status: 'ACTIVE',
        title: 'Active',
        description: 'The account is fully active and the user has full access.'
    },
    {
        status: 'SUSPENDED',
        title: 'Suspended',
        description: 'The account is temporarily suspended due to policy violations or issues.'
    },
    {
        status: 'DEACTIVATED',
        title: 'Deactivated',
        description: 'The user has deactivated their account voluntarily.'
    },
    {
        status: 'BANNED',
        title: 'Banned',
        description: 'The account has been banned permanently due to serious violations.'
    },
    {
        status: 'CLOSED',
        title: 'Closed',
        description: 'The account has been permanently closed and cannot be reactivated.'
    }
]


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  couponCode: string,
  startDate: string,
  endDate: string,
  minOrderValue: string,
  discountPercent: string,
  Status: string,
  Delete:string
) {
  return { couponCode,startDate,endDate,minOrderValue,discountPercent,Status,Delete};
}

const rows = [
  createData('ZOSH34','2025-11-15','2025-11-25','500','50','Active','')
];

const Coupon = () => {
    const [selectedStatus, setSelectedStatus] = useState("ACTIVE")

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStatus(event.target.value)
    };

    return (
        <>
            <div className='pb-5 w-60'>
                <FormControl fullWidth>
                    <InputLabel id="account-status-label">Account Status</InputLabel>
                    <Select
                        labelId="account-status-label"
                        id="account-status-select"
                        value={selectedStatus}
                        label="Account Status"
                        onChange={handleChange}
                    >
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
                            <StyledTableCell >Start Date</StyledTableCell>
                            <StyledTableCell align="right">End Date</StyledTableCell>
                            <StyledTableCell align="right">Min Order Value</StyledTableCell>
                            <StyledTableCell align="right">Discount %</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.couponCode}>
                                <StyledTableCell component="th" scope="row">
                                    {row.couponCode}
                                </StyledTableCell>
                                <StyledTableCell >{row.startDate}</StyledTableCell>
                                <StyledTableCell align="right">{row.endDate}</StyledTableCell>
                                <StyledTableCell align="right">{row.minOrderValue}</StyledTableCell>
                                <StyledTableCell align="right">{row.discountPercent}</StyledTableCell>
                                <StyledTableCell align="right">{row.Status}</StyledTableCell>
                                <StyledTableCell align="right" style={{ color: '#00927c', }}>
                                    <Button>
                                      <Delete/>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default Coupon
