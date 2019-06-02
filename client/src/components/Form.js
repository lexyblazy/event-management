import React, { Component } from "react";
import LocationAutoComplete from "./LocationAutoComplete";
import axios from "axios";
import Calendar from "react-calendar";

class Form extends Component {
  state = {
    title: "",
    details: "",
    location: {
      address: "",
      coordinates: {}
    },
    dates: new Date()
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetFormState = () => {
    this.setState({
      title: "",
      details: ""
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/events", this.state);
      console.log(res.data);
      this.resetFormState();
    } catch (error) {
      console.log({ error });
    }
  };

  updateLocation = location => {
    this.setState({ location });
  };

  validateInputs = () => {
    const { title, details, location, dates } = this.state;
    if (!title || !details) {
      return true;
    }
    if (!Array.isArray(dates)) {
      return true;
    }
    if (dates.length < 2) {
      return true;
    }
    if (!location.address || location.coordinates.length < 2) {
      return true;
    }
    return false;
  };
  handleDateChange = value => {
    this.setState({ dates: value });
  };

  render() {
    const { title, details } = this.state;
    return (
      <form className="col-md-6" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="event-title">Event Title</label>
          <input
            type="text"
            className="form-control"
            id="event-title"
            placeholder="Enter event title"
            onChange={this.handleChange}
            name="title"
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Event Details</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="details"
            value={details}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-location">Event Location</label>
          <LocationAutoComplete updateLocation={this.updateLocation} />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <Calendar
            minDate={new Date()}
            selectRange
            onChange={this.handleDateChange}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={this.validateInputs()}
          >
            {" "}
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
