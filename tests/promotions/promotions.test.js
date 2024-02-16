const { generateReferralCode } = require("../../js/promotions/promotions");

describe("generateReferralCode", () => {
  test("Referral Code contains userId", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);
    expect(referralCode).toContain(userId);
    expect(referralCode).toMatch(userId);
  });

  test("Referral Code has the correct format", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);
    expect(referralCode).toMatch(/#FRIEND-#\d+-#1234/);
  });

  test("Return correct referral code", () => {
    const randomMock = jest.spyOn(global.Math, "random").mockReturnValue(76567);

    const referralCode = generateReferralCode(234);

    expect(referralCode).toBe("#FRIEND-#567-#234");

    expect(randomMock).toHaveBeenCalled();
  });
});
