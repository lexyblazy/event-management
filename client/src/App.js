import React, { Component } from "react";
import Navbar from "./components/NavBar";
import Form from "./components/Form";
import EventCalendar from "./components/EventCalendar";
import Modal from "./components/Modal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    events: [],
    showModal: false,
    selectedEvent: {}
  };
  async componentDidMount() {
    try {
      const res = await axios.get("/api/events");
      const events = res.data.map(event => ({
        ...event,
        start: new Date(event.startAt),
        end: new Date(event.endAt)
      }));
      this.setState({ events });
    } catch (error) {
      console.log(error);
    }
  }
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };
  showDetails = event => {
    this.setState(
      {
        selectedEvent: event
      },
      () => {
        this.toggleModal();
      }
    );
  };
  render() {
    const { events, showModal, selectedEvent } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          {/* <Form /> */}
          {events.length > 0 ? (
            <EventCalendar events={events} showDetails={this.showDetails} />
          ) : null}
          <Modal
            isOpen={showModal}
            toggle={this.toggleModal}
            event={selectedEvent}
          />
        </div>
      </div>
    );
  }
}

export default App;
