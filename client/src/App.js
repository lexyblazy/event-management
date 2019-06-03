import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/NavBar";
import { Spinner } from "reactstrap";
import EventCalendar from "./components/EventCalendar";
import EventDetailsModal from "./components/EventDetailsModal";
import CreateEventModal from "./components/CreateEventModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

class App extends Component {
  state = {
    events: [],
    detailsModal: false,
    formModal: false,
    selectedEvent: {}
  };
  componentDidMount() {
    this.fetchAllEvents();
  }

  fetchAllEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      const events = res.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      this.setState({ events });
    } catch (error) {
      console.log(error);
    }
  };

  toggleEventModal = () => {
    this.setState(prevState => ({
      detailsModal: !prevState.detailsModal
    }));
  };

  toggleFormModal = () => {
    this.setState(prevState => ({
      formModal: !prevState.formModal
    }));
  };
  showDetails = event => {
    this.setState(
      {
        selectedEvent: event
      },
      () => {
        this.toggleEventModal();
      }
    );
  };
  render() {
    const { events, detailsModal, selectedEvent, formModal } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          {/* <Form /> */}
          <div className="margin-top-30">
            <button className="btn btn-primary" onClick={this.toggleFormModal}>
              New event
            </button>
          </div>
          {events.length > 0 ? (
            <EventCalendar events={events} showDetails={this.showDetails} />
          ) : (
            <Spinner type="grow" color="primary" />
          )}
          <EventDetailsModal
            isOpen={detailsModal}
            toggle={this.toggleEventModal}
            event={selectedEvent}
          />
          <CreateEventModal
            isOpen={formModal}
            toggle={this.toggleFormModal}
            callback={this.fetchAllEvents}
          />
        </div>
      </div>
    );
  }
}

export default App;
