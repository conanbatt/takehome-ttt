import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is stored in an environment variable
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { board } = req.body;

    if (!board) {
      return res.status(400).json({ error: "Invalid board format" });
    }

    try {
      // Formatting the board to send it to GPT
      const boardString = board.toString();

      const prompt = `Here's a Tic Tac Toe board represented as a single dimensional array. The player is 'X'. Which index (with the board represented as a single array of 9 digits)
should the player move next? Do your best to win. You must not select a position that is already taken. Always start in the center if its empty. \n\n${boardString}\n\nRespond only with the index number:`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
      });

      const move = response.choices[0].message.content;
      console.log("response", response, move);
      if (move) {
        res.status(200).json({ move });
      } else {
        res.status(500).json({ error: "Could not parse move from response" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
