import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LocationAutoComplete from "./LocationAutoComplete";
import axios from "axios";
import Calendar from "react-calendar";

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      location: {
        address: "",
        coordinates: {}
      },
      dates: new Date()
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { callback } = this.props;
    try {
      const res = await axios.post("/api/events", this.state);
      if (res.status === 200) {
        if (res.data.existingEvent) {
          alert(res.data.message);
        } else {
          callback && callback();
          this.toggle();
          this.setState({
            title: "",
            details: ""
          });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  updateLocation = location => {
    this.setState({ location });
  };

  toggle = () => {
    this.props.toggle();
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
    const { isOpen } = this.props;
    const { title, details } = this.state;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggle} size="large" scrollable>
          <ModalHeader toggle={this.toggle}>Create a new event</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={this.handleSubmit}
              disabled={this.validateInputs()}
            >
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FormModal;
