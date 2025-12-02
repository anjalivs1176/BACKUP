import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


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
  name: string,
  email: string,
  mobile: string,
  businessName: string,
  gstin: string,
  status: string,
  changeStatus:string
) {
  return { name,email,mobile,businessName,gstin,status,changeStatus };
}

const rows = [
  createData('Ram', 'ram@gmail.com', '9876543210', 'Ram Clothing','ADH466B34','ACTIVE','CHANGE STATUS')
];

const SellersTable = () => {
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
                            <StyledTableCell>Seller Name</StyledTableCell>
                            <StyledTableCell >Email</StyledTableCell>
                            <StyledTableCell align="right">Mobile</StyledTableCell>
                            <StyledTableCell align="right">Business Name</StyledTableCell>
                            <StyledTableCell align="right">GSTIN</StyledTableCell>
                            <StyledTableCell align="right">Account Status</StyledTableCell>
                            <StyledTableCell align="right">Change Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell >{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                                <StyledTableCell align="right">{row.businessName}</StyledTableCell>
                                <StyledTableCell align="right">{row.gstin}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right" style={{ color: '#00927c', }}>
                                    <Button>Change Status</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default SellersTable
