import React, { Component } from "react";
import ReactTable from "react-table";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SnackBar from "@material-ui/core/Snackbar";
import AddTraining from "./AddTraining";
import SaveIcon from "@material-ui/icons/Save";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class Trainings extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], id: "", msg: "" };
  }

  componentDidMount() {
    this.listTrainings();
  }

  listTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ trainings: responseData });
      });
  };

  addTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    })
      .then(response => {
        this.setState({ showSnacks: true, msg: "New training is added" });
        this.listTrainings();
      })
      .catch(err => {
        this.setState({ msg: "Error occured. Training is not added" });
      });
  };

  deleteTraining = value => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure you wish to delete the training?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + value, {
              method: "DELETE"
            })
              .then(response => {
                this.listTrainings();
                this.setState({ showSnacks: true, msg: "Training is deleted" });
              })
              .catch(err => {
                this.setState({
                  msg: "Error occured. Training is not deleted"
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
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  editTraining = (training, value) => {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + value, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    })
      .then(response => {
        this.setState({ showSnacks: true, msg: "Training is updated" });
        this.listTrainings();
      })
      .catch(err => {
        this.setState({ msg: "Error occured. Training is not saved" });
      });
  };

  render() {
    const columns = [
      {
        Header: "Date (yyyy-m-d )",
        accessor: "date",
        Cell: props => <span>{moment.utc(props.value).format("LLL")}</span>,
        className: "cell"
      },
      {
        Header: "Duration (min)",
        accessor: "duration",
        Cell: this.renderEditable,
        className: "cell",
        maxWidth: 120
      },
      {
        Header: "Activity",
        accessor: "activity",
        Cell: this.renderEditable,
        className: "cell"
      },
      {
        Header: "Customer ID",
        accessor: "customer.id",
        className: "cell",
        maxWidth: 100
      },
      {
        Header: "Customer's Last Name",
        accessor: "customer.lastname",
        className: "cell"
      },
      {
        Header: "Customer's First Name",
        accessor: "customer.firstname",
        className: "cell"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        accessor: "id",
        Cell: ({ row, value }) => (
          <Tooltip title="Edit" placement="right-end">
            <Button
              size="small"
              color="primary"
              onClick={() => this.editTraining(row, value)}
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
        accessor: "id",
        Cell: ({ value }) => (
          <Tooltip title="Delete" placement="right-end">
            <Button
              size="small"
              color="secondary"
              onClick={() => this.deleteTraining(value)}
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
        <AddTraining addTraining={this.addTraining} />
        <ReactTable
          filterable={true}
          data={this.state.trainings}
          columns={columns}
          defaultSorted={[
            {
              id: "customer.id",
              asc: true
            }
          ]}
        />
        <SnackBar
          message={this.state.msg}
          autoHideDuration={3000}
          open={this.state.showSnacks}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Trainings;
