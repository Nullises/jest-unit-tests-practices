const { Event } = require("../../js/events/event");
const { getEvents } = require("../../js/events/search");
describe("getEvents", () => {
  test("Return events with price less than 30", () => {
    const searchPredicateMock = jest.fn((e) => e.ticketPrice < 30);

    const expectedEvent1 = new Event(1, "Concert", 25, 2500, 2500);
    const expectedEvent2 = new Event(2, "Concert 2", 28, 2500, 2500);
    const expectedEvent3 = new Event(3, "Concert 3", 25, 2500, 2500);
    const unexpectedEvent = new Event(4, "Concert 4", 50, 2500, 2500);

    const events = [
      expectedEvent1,
      expectedEvent2,
      expectedEvent3,
      unexpectedEvent,
    ];
    const filterResults = getEvents(events, searchPredicateMock);

    expect(filterResults).toEqual([
      expectedEvent1,
      expectedEvent2,
      expectedEvent3,
    ]);

    expect(searchPredicateMock).toHaveBeenCalledTimes(4); // called once per element
  });
});
