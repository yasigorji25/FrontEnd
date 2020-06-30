import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { Button, Col, Navbar, Row, Nav, NavbarBrand } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Stocks() {
  return (
    <main>
      <StockList />
    </main>
  );
}
// display all the stocks.
function StockList() {
  const [rowData, setRowData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const API_URL = "http://131.181.190.87:3000";
    const url = `${API_URL}/stocks/symbols`;
    fetch(url)
      .then(res => res.json())
      .then(data =>
        data.map(stock => {
          return {
            name: stock.name,
            symbol: stock.symbol,
            industry: stock.industry
          };
        })
      )
      .then(stocks => setRowData(stocks));
  }, []);
  // columns for stocks
  const columns = [
    { headerName: "Name", field: "name", filter: true, floatingFilter: true },
    {
      headerName: "Symbol",
      field: "symbol",
      filter: true,
      floatingFilter: true
    },
    {
      headerName: "Industry",
      field: "industry",
      filter: true,
      floatingFilter: true
    }
  ];

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12">
          <Navbar className="custNav navbar-inverse bg-info" expand="md">
            <NavbarBrand href="/" className="text-white">
              Home
            </NavbarBrand>
            <Nav className="rightNav ml-auto" navbar>
              <Link to="/user/login">
                <Button
                  color="info"
                  type="loginButton"
                  class="btn btn-outline-info btn-margin-left"
                  width="200p"
                  className="float-right"
                >
                  login
                </Button>
              </Link>

              <Link to="/user/register">
                <Button
                  color="info"
                  type="registerButton"
                  class="button"
                  width="200p"
                  className="float-right"
                >
                  Register
                </Button>
                {"  "}
              </Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>

      <h1>Stock List</h1>
      <center>
        <div
          className="ag-theme-balham"
          style={{
            height: "655px",
            width: "600px"
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            onRowClicked={row => history.push(`/stocks/${row.data.symbol}`)}
          />
        </div>
      </center>
    </div>
  );
}
