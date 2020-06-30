import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { Button, Col, Navbar, Row, Nav, NavbarBrand } from "reactstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SymbolDetail() {
  return (
    <main>
      <DetailStockList />
    </main>
  );
}
// Non authicated route for single stock symbol
function DetailStockList() {
  const [rowData, setRowData] = useState([]);
  const [name, setName] = useState("");
  let { symbol } = useParams();
  let arr = [];
  const history = useHistory();

  useEffect(() => {
    //const url = `${API_URL}`;
    fetch(`http://131.181.190.87:3000/stocks/${symbol}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        // let arr = [];
        arr.push(data);
        setRowData(arr);
      });
  }, []);

  const columns = [
    {
      headerName: "Date",
      field: "timestamp",
      //filter: true,
      filter: "agDateColumnFilter",
      // add extra parameters for the date filter

      filterParams: {
        browserDatePicker: true,
        // provide comparator function
        comparator: function(filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          var dateParts = dateAsString.split("/");
          var day = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[0]);
          var cellDate = new Date(day, month, year);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    },
    { headerName: "Open", field: "open", filter: true, sortable: true },
    { headerName: "High", field: "high", filter: true, sortable: true },
    { headerName: "Low", field: "low", filter: true, sortable: true },
    { headerName: "Close", field: "close", filter: true, sortable: true },
    { headerName: "Volumes", field: "volumes", filter: true, sortable: true }
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

      <h1>
        {symbol} - {name}
      </h1>

      <center>
        <div
          className="ag-theme-balham"
          style={{
            height: "400px",
            width: "1200px"
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={7}
            onRowClicked={row =>
              history.push(`/stocks/authed/${row.data.symbol}`)
            }
          />
        </div>
      </center>
    </div>
  );
}
