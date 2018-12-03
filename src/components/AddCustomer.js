import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SkyLight from "react-skylight";
import SaveIcons from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    this.addModel = React.createRef();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addCustomer = () => {
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };

    this.props.addCustomer(customer);
    this.addModel.current.hide();
  };

  render() {
    const addDialog = {
      width: "30%",
      height: "300px",
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
          New Customer
        </Button>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModel}
          title="Fill in the info :)"
        >
          <TextField
            placeholder="First Name"
            name="firstname"
            onChange={this.handleChange}
            value={this.state.firstname}
          />{" "}
          <br />
          <TextField
            placeholder="Last name"
            name="lastname"
            onChange={this.handleChange}
            value={this.state.lastname}
          />{" "}
          <br />
          <TextField
            placeholder="Street Address"
            name="streetaddress"
            onChange={this.handleChange}
            value={this.state.streetaddress}
          />{" "}
          <br />
          <TextField
            placeholder="Postcode"
            name="postcode"
            onChange={this.handleChange}
            value={this.state.postcode}
          />{" "}
          <br />
          <TextField
            placeholder="City"
            name="city"
            onChange={this.handleChange}
            value={this.state.city}
          />{" "}
          <br />
          <TextField
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />{" "}
          <br />
          <TextField
            placeholder="Phone number"
            name="phone"
            onChange={this.handleChange}
            value={this.state.phone}
          />{" "}
          <br />
          <Button
            style={{ margin: 15 }}
            onClick={this.addCustomer}
            variant="contained"
            color="default"
          >
            <SaveIcons />
            SAVE
          </Button>
        </SkyLight>
      </div>
    );
  }
}

export default AddCustomer;
