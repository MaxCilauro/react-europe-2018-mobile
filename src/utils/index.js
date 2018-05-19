import moment from "moment-timezone";
import _ from "lodash";
export firebase, { questionsRef } from './firebase';

export const Schedule = require("../data/schedule.json");
const Event = Schedule.events[0];

const CONFERENCE_START_TIME = convertUtcDateToEventTimezone(Event.startDate);
const CONFERENCE_END_TIME = moment.tz('2018-05-17T19:00:00', 'Europe/Paris');

export function getSpeakerTalk(speaker) {
  const talk = _.find(speaker.talks, function(talk) {
    return talk.type === 0;
  });
  if (!talk) {
    return speaker.talks[0];
  }
  return talk;
}

export function convertUtcDateToEventTimezone(date) {
  let d = new Date(date);
  return moment.tz(d, Event.timezoneId);
}

export function convertUtcDateToEventTimezoneHour(date) {
  let d = new Date(date);
  return moment.tz(d, Event.timezoneId).format("hh:mma");
}

export function convertUtcDateToEventTimezoneDaytime(date) {
  let d = new Date(date);
  return moment.tz(d, Event.timezoneId).format("dddd DD MMM, h:mma");
}

export function conferenceHasStarted() {
  return Event.status.hasStarted;
}

export function conferenceHasEnded() {
  return moment.tz('Europe/Paris').isAfter(CONFERENCE_END_TIME);
}

export function HideWhenConferenceHasStarted({ children }) {
  if (conferenceHasStarted()) {
    return null;
  } else {
    return children;
  }
}

export function HideWhenConferenceHasEnded({ children }) {
  if (conferenceHasEnded()) {
    return null;
  } else {
    return children;
  }
}

export function ShowWhenConferenceHasEnded({ children }) {
  if (conferenceHasEnded()) {
    return children;
  } else {
    return null;
  }
}
