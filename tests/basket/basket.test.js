const basket = require("../../js/basket/basket");
const { Event } = require("../../js/events/event");
const { BasketItem } = require("../../js/basket/basketitem");
const { User } = require("../../js/users/users");

describe("calculateTotal:", () => {
  let events = [];
  let items = [];

  beforeEach(() => {
    events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.0, 2500, 2500),
    ];

    items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];
  });

  test("Test calculates total basket price when no discount applied", () => {
    const total = basket.calculateTotal(items);

    expect(total).toBeCloseTo(2770.0, 2);
  });

  test("Test calculates total basket price with discount", () => {
    const total = basket.calculateTotal(items, 800);

    expect(total).toBeCloseTo(1970.0, 2);
  });
});

describe("showAdverts", () => {
  test("Does not show adverts for premium users", () => {
    let user = new User(1, "Test User");
    user.isPremium = true;

    expect(basket.showAdverts(user)).toBe(false);
  });

  test("Shows adverts for non-premium users", () => {
    let user = new User(1, "Test User");
    expect(basket.showAdverts(user)).toBe(true);
  });
});

describe("searchBasket", () => {
  test("Only returns events that match the search query", () => {
    const events = [
      new Event(1, "A Night At the Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "The Rage Against The Machine", 35.0, 2500, 2500),
    ];

    const items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];

    const foundItems = basket.searchBasket(items, "THE");

    expect(foundItems).toContain(items[0]);
    expect(foundItems).not.toContain(items[1]);
    expect(foundItems).toContain(items[2]);
  });
});

describe("serializeBasketItemsToJson", () => {
  test("Basket items are serialized correctly", () => {
    const events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.0, 2500, 2500),
    ];

    const items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];

    // This is the expected result

    itemsSerializedToJson = [
      {
        event: {
          id: 1,
          name: "A Night At The Proms",
          ticketPrice: 2500.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 1,
      },
      {
        event: {
          id: 2,
          name: "Taylor Swift",
          ticketPrice: 50.0,
          totalTickets: 5500,
          ticketsRemaining: 2500,
        },
        ticketCount: 4,
      },
      {
        event: {
          id: 3,
          name: "Rage Against The Machine",
          ticketPrice: 35.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 2,
      },
    ];

    const serializedItems = basket.serializeBasketItemsToJson(items);
    expect(serializedItems).toEqual(itemsSerializedToJson);
  });
});

describe("getBasketItem", () => {
  let events = [];
  let items = [];
  beforeEach(() => {
    events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.0, 2500, 2500),
    ];

    items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];
  });

  test("Return truthy value if event exists in basket", () => {
    const basketItem = basket.getBasketItem(items, events[0]);

    expect(basketItem).toBeTruthy();
  });

  test("Returns falsy if events does not exist in basket", () => {
    const nonExistentEvent = new Event(
      99,
      "Non-existent Event",
      2500.0,
      2500,
      2500
    );

    const basketItem = basket.getBasketItem(items, nonExistentEvent);
    expect(basketItem).toBeFalsy();
  });
});
