const { InvalidEventNameError } = require("../../js/error-handling/exceptions");
const { Event, getTagLine, createEvent } = require("../../js/events/event");

test("Return Sold Out tagline when no tickets left", () => {
  // We create a new event, and the last parameters (tickets remaining)
  // Will be zero, since we will test the sold out
  const event = new Event(1, "Summer BBQ", 40.0, 100, 0);

  //Now we test the tagline function
  const tagline = getTagLine(event, 10, true);

  // We expect that the result will be to the sold out message
  expect(tagline).toBe("Event Sold Out!");
});

describe("createEvent", () => {
  test("Throw error when name is not a string", () => {
    expect(() => createEvent(1, 23, 40.0)).toThrow(
      new InvalidEventNameError("Event name cannot exceed 200 characters")
    );
  });

  test("Throw error when price is not a number", () => {
    expect(() => createEvent("Event", "23", 40.0)).toThrow(
      new InvalidEventNameError("Event price must be more or equal to 0")
    );
  });

  test("Throw error when available events is not a number", () => {
    expect(() => createEvent("Event", 23.5, "40.0")).toThrow(
      new InvalidEventNameError("Event tickets must be more than 0")
    );
  });
});
