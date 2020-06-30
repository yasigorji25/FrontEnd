import { AgGridReact } from "ag-grid-react";
import { Line } from "react-chartjs-2";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// columns for the particular stock
const columns = [
  { headerName: "Date", field: "timestamp", filter: true },
  { headerName: "Open", field: "open", filter: true },
  { headerName: "High", field: "high", filter: true },
  { headerName: "Low", field: "low", filter: true },
  { headerName: "Close", field: "close", filter: true },
  { headerName: "Volumes", field: "volumes", filter: true }
];
export default function PriceHistory() {
  return (
    <main>
      <StockHistory />
    </main>
  );
}
// shows all the information between selected dates by upadating table and displaying Linechart.
function StockHistory() {
  let { id } = useParams();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [rowData, setRowData] = useState([]);
  const [graphstate, setgraphstate] = useState(false);
  const [chartData, setChartData] = useState({});
  const [name, setName] = useState("");
  let token = localStorage.getItem("token");
  const headers = {
    accept: "application/json",

    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
  const API_URL = "http://131.181.190.87:3000";
  const url = `${API_URL}/stocks/authed/${id}`;
  useEffect(() => {
    fetch(url, { headers })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        let arr = [];
        arr.push(data);
        setRowData(arr);
        setgraphstate(false);
      });
  }, []);
  // display graph
  function Showgraph() {
    if (graphstate) {
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: {
                text: `Price History for ${id}`,
                display: true
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "price"
                    },
                    ticks: {
                      autoSkip: true
                    }
                  }
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Day"
                    },
                    ticks: {
                      autoSkip: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }
  // get data such from and to date as well as symbol
  function getStockHistory() {
    const url = `http://131.181.190.87:3000/stocks/authed/${id}?from=${fromDate.toISOString()}&to=${toDate.toISOString()}`;

    fetch(url, { headers })
      .then(res => res.json())
      .then(data => {
        let closePrice = [];
        let dates = [];
        let openprice = [];

        if (data.error) {
          alert(data.message);
        } else {
          for (const dataObj of data) {
            closePrice.push(parseInt(dataObj.close));
            dates.push(dataObj.timestamp.slice(0, 10));
            openprice.push(parseInt(dataObj.open));
          }
          setChartData({
            labels: dates,
            datasets: [
              {
                label: "Close Price",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: closePrice
              },
              {
                label: "open Price",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(255, 159, 64, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255, 159, 64, 0.2)",
                pointHoverBorderColor: "rgba(255, 159, 64, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: openprice
              }
            ]
          });
          setRowData(data);
          if (data.length > 1) {
            setgraphstate(true);
          } else {
            setgraphstate(false);
          }
        }
      });
  }
  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12">
          <Navbar className="custNav navbar-inverse bg-info" expand="md">
            <NavbarBrand href="/" className="text-white">
              Home
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/stocks/symbols" className="text-white">
                  Stock List
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <h1>
        {id} - {name}
      </h1>
      <div>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Form inline>
            <FormGroup>
              <Label for="fromDate" sm={3} size="lg">
                From
              </Label>
              <DatePicker
                selected={fromDate}
                onChange={update => setFromDate(update)}
                showTimeSelect
                dateFormat="yyyy/MM/dd"
              />
            </FormGroup>
            {/* <Col sm={{ size: "small", offset: 1 }}></Col> */}
            <FormGroup>
              <Label for="toDate" sm={1} size="lg">
                To
              </Label>
              <DatePicker
                selected={toDate}
                onChange={update => setToDate(update)}
                showTimeSelect
                dateFormat="yyyy/MM/dd"
              />
              <Button
                color="info"
                onClick={() => {
                  getStockHistory();
                }}
              >
                Select Date
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </div>
      <div className="container">
        <center>
          <div
            className="ag-theme-balham"
            style={{
              height: "400px",
              width: "1080px"
            }}
          >
            <AgGridReact
              columnDefs={columns}
              rowData={rowData}
              pagination={true}
              paginationPageSize={12}
              colWidth={180}
            />

            {Showgraph()}
          </div>
        </center>
      </div>
    </div>
  );
}
// function logout() {
//   return localStorage.removeItem("token");
// }
