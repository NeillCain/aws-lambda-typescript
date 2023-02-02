import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon, { SinonStub } from "sinon";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { makePizza } from "../repositories/PizzaDb";
 
chai.use(chaiAsPromised);
 
describe("PizzaDb", () => {
  let send: SinonStub;
 
  let pizzaItem = {
    url: { S: "P" },
    name: { S: "P" },
    ingredients: { SS: ["A", "B"] },
  };
 
  beforeEach(() => {
    send = sinon.stub(DynamoDBClient.prototype, "send"); // stub
  });
 
  afterEach(() => {
    send.restore();
  });
 
  it("makePizza#success", async () => {
    send.resolves();
 
    const result = await makePizza({
      name: "P",
      ingredients: ["A", "B"],
    });
 
    expect(result).to.deep.equal(pizzaItem);
  });
 
  it("makePizza#fail", async () => {
    send.resolves();
 
    await expect(makePizza({})).to.eventually.be.rejected; // fail
  });
});