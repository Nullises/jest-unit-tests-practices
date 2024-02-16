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
});
