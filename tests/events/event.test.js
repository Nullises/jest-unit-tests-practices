const { Event, getTagLine } = require("../../js/events/event");

test("Return Sold Out tagline when no tickets left", () => {
  // We create a new event, and the last parameters (tickets remaining)
  // Will be zero, since we will test the sold out
  const event = new Event(1, "Summer BBQ", 40.0, 100, 0);

  //Now we test the tagline function
  const tagline = getTagLine(event, 10, true);

  // We expect that the result will be to the sold out message
  expect(tagline).toBe("Event Sold Out!");
});
