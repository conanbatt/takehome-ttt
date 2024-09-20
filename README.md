## TicTacToe.ai

An irrepeatable implementation of TicTacToe playable at

```https://takehome-koj0nkl5b-conanbatts-projects.vercel.app/```

https://github.com/user-attachments/assets/8e378067-23c0-4bfb-aa15-db776fadd7eb

The game is meant to be played with sound ON!

### Running Locally

This project is based on Next.js. Run the development server with:

```bash
npm i
npm run dev
```

### Choices

*Next.js vs Vite* - There aren't specific framework features used in this implementation, so any client side solutino would work. Next.js has sane defaults and its the tool I'm most used to using.

*Framer Motion* - The most common framework to spruce up transitions and animations, to give the experience an extra flare.

*Howler* - For Cross-browser compatible audio handling. The game has custom made sound!

*OpenAI* - For adversarial game play.

Currently using gpt-4o-mini to select next moves. Surprisingly, chatGPT is not only a poor TTT player, but it provides invalid moves which I had to override
to prevent the game from having issues.

Please do enjoy the artisanal soundtrack!
