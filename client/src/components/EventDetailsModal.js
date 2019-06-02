import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Map from "./Map";

import { isValidObject } from "../utils";

class EventDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.props.toggle();
  };
  render() {
    const { isOpen, event } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggle} size="large" scrollable>
          <ModalHeader toggle={this.toggle}>
            {isValidObject(event) && event.title}
          </ModalHeader>
          <ModalBody>
            <strong>Details</strong>: {isValidObject(event) && event.details}
            <br />
            <br />
            <strong>Address</strong>:{" "}
            {isValidObject(event) && event.location.address} <br /> <br />
            <div style={{ position: "relative", height: 300 }}>
              <Map
                lat={isValidObject(event) && event.location.coordinates[1]}
                lon={isValidObject(event) && event.location.coordinates[0]}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EventDetailsModal;
