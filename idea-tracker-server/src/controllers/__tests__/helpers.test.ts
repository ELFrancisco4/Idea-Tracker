import * as helpers from '../helpers';


describe("Create A User", () => {
  it("Create a new User", async () => {
     const user = await helpers.createUser("Hacker", "hacker@gmail.com", "12345678");
     expect(user).toHaveProperty('id');
     expect(user).toHaveProperty('name');
  });
});
