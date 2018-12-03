import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import moment from "moment";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: []
    };
  }

  componentDidMount() {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        let events = [];
        for (let i = 0; i < responseData.length; i++) {
          events.push({
            start: moment.utc(responseData[i].date).format("LLL"),
            end: moment.utc(responseData[i].date).format("LLL"),
            //may cause errors if there is lack of lastname and firstname for the customer
            title:
              responseData[i].activity +
              " - " +
              responseData[i].customer.lastname +
              " " +
              responseData[i].customer.firstname
          });
          this.setState({ event: events });
        }
        this.setState({ event: events });
      });
  }

  render() {
    return (
      <div id="calendar">
        <FullCalendar
          header={{
            left: "prev,next today myCustomButton",
            center: "title",
            right: "month,basicWeek,basicDay"
          }}
          navLinks={true}
          editable={true}
          eventLimit={true}
          events={this.state.event}
        />
      </div>
    );
  }
}
export default Calendar;
