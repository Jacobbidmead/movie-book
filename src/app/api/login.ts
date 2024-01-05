import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../app/lib/dbConnect";
import User from "../app/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure database connection
    await dbConnect(); // Call dbConnect here to establish the connection

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;
    console.log("Reached API route");

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
