import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const existingUser = await users.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  await users.insertOne({ username, password });

  return res.status(201).json({ message: "User created" });
}
