import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  fetchSellerProducts,
  toggleStock
} from "../../../state/seller/sellerProductSlice";

import { Product } from "../../../type/productType";

// -----------------------------
// Styled Components
// -----------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

// -----------------------------
// Main Component
// -----------------------------
export default function ProductTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products } = useAppSelector((state) => state.sellerProduct);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    dispatch(fetchSellerProducts(jwt));
  }, [dispatch]);

  // Handle Loading/Empty State: Optional but good practice
  if (!products || products.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        No products found. Start adding new items!
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((item: Product) => (
            <StyledTableRow key={item.id}>
              
              {/* IMAGES - FIX IS HERE */}
              <StyledTableCell>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {/* FIX: Use Optional Chaining (item.images?.map) */}
                  {/* This ensures .map() is only called if item.images is defined and not null */}
                  {item.images?.map((image, index) => (
                    <img
                      key={index}
                      style={{ width: "80px", borderRadius: "6px" }}
                      src={image}
                      alt="product"
                    />
                  ))}
                </div>
              </StyledTableCell>

              {/* TITLE */}
              <StyledTableCell>{item.title}</StyledTableCell>

              {/* MRP */}
              <StyledTableCell align="right">
                ₹{item.mrpPrice}
              </StyledTableCell>

              {/* SELLING PRICE */}
              <StyledTableCell align="right">
                ₹{item.sellingPrice}
              </StyledTableCell>

              {/* COLOR */}
              <StyledTableCell align="right">{item.color}</StyledTableCell>

              {/* STOCK - TEXT CLICK TO TOGGLE */}
              <StyledTableCell align="right">
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: item.stockStatus === "IN_STOCK" ? "green" : "red"
                  }}
                  onClick={() => {
                    const newStatus =
                      item.stockStatus === "IN_STOCK"
                        ? "OUT_OF_STOCK"
                        : "IN_STOCK";

                    dispatch(
                      toggleStock({
                        productId: item.id,
                        stockStatus: newStatus,
                        jwt: localStorage.getItem("jwt")
                      })
                    );
                  }}
                >
                  {item.stockStatus}
                </span>
              </StyledTableCell>

              {/* EDIT BUTTON */}
              <StyledTableCell align="right">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() =>
                    navigate(`/seller/edit-product/${item.id}`)
                  }
                >
                  <Edit />
                </IconButton>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}