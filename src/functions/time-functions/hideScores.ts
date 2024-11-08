export const handleHideScores_NoSetter = (dateOfMeeting: string): boolean => {
  if (dateOfMeeting) {
    const meetingDateInMs = new Date(dateOfMeeting).getTime();
    const currentDateInMs = Date.now();
    if (meetingDateInMs < currentDateInMs) {
      return false;
    }
    return true;
  }
};
