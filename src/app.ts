import express, { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) => {
	return response.json({ message: "Hello World" });
});

export { app };
