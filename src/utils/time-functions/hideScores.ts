export const handleHideScores_NoSetter = (
  actualDateOfMeeting: string | Date
): boolean => {
  if (actualDateOfMeeting) {
    const meetingDateInMs = new Date(actualDateOfMeeting).getTime()
    const currentDateInMs = Date.now()
    if (meetingDateInMs <= currentDateInMs) {
      return false
    }
  }
  return true
}
