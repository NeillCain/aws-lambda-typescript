import Api from "claudia-api-builder";
import { makePizza, tastePizza, allPizzas } from "./repositories/PizzaDb";

const api = new Api();

api.post('/pizzas', async (request: any) =>
    await makePizza(request.body), {
    success: 201,
    error: 400
});

api.get('/pizzas/{url}', async (request: any) =>
    await tastePizza(request.pathParams.url), {
    success: 200,
    error: 404
});

api.get('/pizzas', async () =>
    await allPizzas(), {
    success: 200
});

export = api;