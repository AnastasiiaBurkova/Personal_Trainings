import React, { Component } from "react";
import SkyLight from "react-skylight";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "", duration: "", activity: "", customer: "" };
    this.addModel = React.createRef();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTraining = () => {
    const training = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer:
        "https://customerrest.herokuapp.com/api/customers/" +
        this.state.customer
    };
    this.props.addTraining(training);
    this.addModel.current.hide();
  };

  render() {
    const addDialog = {
      width: "25%",
      height: "50px",
      marginLeft: "-15%"
    };
    return (
      <div className="container2">
        <Button
          className="addBtn"
          style={{ margin: 10 }}
          variant="contained"
          color="primary"
          onClick={() => this.addModel.current.show()}
        >
          {" "}
          <AddIcon />
          New Training
        </Button>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModel}
          title="Fill in the info :)"
        >
          <TextField
            placeholder="Date"
            name="date"
            type="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
          <br />
          <TextField
            placeholder="Duration"
            name="duration"
            onChange={this.handleChange}
            value={this.state.duration}
          />{" "}
          <br />
          <TextField
            placeholder="Activity"
            name="activity"
            onChange={this.handleChange}
            value={this.state.activity}
          />{" "}
          <br />
          <TextField
            placeholder="Customer ID"
            name="customer"
            onChange={this.handleChange}
            value={this.state.customer}
          />
          <br />
          <Button
            style={{ margin: 15 }}
            variant="contained"
            color="default"
            onClick={this.addTraining}
          >
            <SaveIcon />
            Save
          </Button>
        </SkyLight>
      </div>
    );
  }
}

export default AddTraining;
