import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddCustomer from "./AddCustomer";
import SaveIcon from "@material-ui/icons/Save";

class Customers extends Component {
  constructor(params) {
    super(params);

    this.state = { customers: [], msg: "" };
  }

  componentDidMount() {
    this.listCustomers();
  }

  listCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({ customers: responseData.content });
      });
  };

  addCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(response => {
        this.setState({ showSnacks: true, msg: "New customer is added" });
        this.listCustomers();
      })
      .catch(err => {
        console.error(err);
        this.setState({ msg: "Error occured. Customer is not added" });
      });
  };

  deleteCustomer = link => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure you wish to delete the customer?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(link, { method: "DELETE" })
              .then(response => {
                this.listCustomers();
                this.setState({
                  showSnacks: true,
                  msg: "Customer is deleted!"
                });
              })
              .catch(err => {
                this.setState({
                  msg: "Error occured. Customer is not deleted"
                });
              });
          }
        },
        {
          label: "No"
        }
      ]
    });
  };

  handleClose = () => {
    this.setState({ showSnacks: false });
  };
  renderEditable = cellInfo => {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  editCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(response => {
        this.setState({ showSnacks: true, msg: "Customer is updated" });
        this.listCustomers();
      })
      .catch(err => {
        console.error(err);
        this.setState({ msg: "Error occured. Customer is not saved" });
      });
  };

  render() {
    const columns = [
      {
        Header: "Customer id",
        accessor: "links[0].href",
        sortable: false,
        filterable: false,
        Cell: ({ value }) => value.substring(value.lastIndexOf("/") + 1),
        className: "cell"
      },
      {
        Header: "First name",
        accessor: "firstname",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "Last name",
        accessor: "lastname",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "Street address",
        accessor: "streetaddress",
        Cell: this.renderEditable,
        className: "cell",
        minWidth: 155
      },
      {
        Header: "Post code",
        accessor: "postcode",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "City",
        accessor: "city",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: this.renderEditable,
        className: "cell",
        minWidth: 155
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        accessor: "links[0].href",
        Cell: ({ row, value }) => (
          <Tooltip title="Edit" placement="right-end">
            <Button
              size="small"
              color="primary"
              onClick={() => this.editCustomer(row, value)}
              aria-label="Edit"
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        ),
        className: "cell"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <Tooltip title="Delete" placement="right-end">
            <Button
              size="small"
              color="secondary"
              onClick={() => this.deleteCustomer(value)}
              aria-label="Delete"
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        ),
        className: "cell"
      }
    ];
    return (
      <div>
        <AddCustomer addCustomer={this.addCustomer} />
        <ReactTable
          filterable={true}
          sortable={true}
          defaultSorted={[
            {
              id: "lastname",
              asc: true
            }
          ]}
          defaultPageSize={12}
          data={this.state.customers}
          columns={columns}
        />
        <Snackbar
          message={this.state.msg}
          autoHideDuration={3000}
          open={this.state.showSnacks}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Customers;
