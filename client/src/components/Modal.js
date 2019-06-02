import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Map from "./Map";

function isValidObject(obj) {
  return !!Object.keys(obj).length;
}

class ModalExample extends React.Component {
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
    console.log(event);
    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggle} size="large">
          <ModalHeader toggle={this.toggle}>{event && event.title}</ModalHeader>
          <ModalBody>
            Details: {event && event.details} <br />
            Address: {isValidObject(event) && event.location.address}
            <div className="container" style={{ position: "relative" }}>
              {/* <Map
                lat={isValidObject(event) && event.location.coordinates[1]}
                lon={isValidObject(event) && event.location.coordinates[0]}
              /> */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
