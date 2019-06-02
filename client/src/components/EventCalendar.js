import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = ({ events, showDetails = () => {} }) => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      defaultView={BigCalendar.Views.WEEK}
      endAccessor="end"
      defaultDate={new Date()}
      selectable
      onSelectEvent={event => showDetails(event)}
    />
  </div>
);

export default MyCalendar;
