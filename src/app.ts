import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
	hello: () => {
		return "Hello world!";
	},
};

const app = express();

app.get("/", (request: Request, response: Response) => {
	return response.json({ message: "Hello World" });
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

export { app };
