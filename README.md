# Vision AI
### A powerful application that allows users to query an AI across various domains including chat, image, video, music generation, and code generation.
![App screenshot](https://i.imgur.com/l1kg1ev.png)
Users authenticate using Clerk.js and can purchase tokens via Stripe to access the AI's functionalities.


## Features

- **Multi-Domain AI Queries**: Access various AI capabilities such as:
  - Chatbot
  - Image Generator
  - Video Generator
  - Music Generator
  - Code Generator
 
![Chatbot](https://i.imgur.com/cAFYfr9.png)

- **User Authentication**: Utilizes Clerk.js for secure user authentication.

- **Token-Based Access**: Users can buy tokens through Stripe to leverage AI functionalities.

- **Database Integration**: Prisma and MongoDB utilized for robust database support.

![Image generation](https://i.imgur.com/S3CBrFy.png)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yinghaoawang/Vision-AI.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file and fill in the required environment variables.

4. Start the application:
   ```bash
   npm run dev
   ```

### Stripe webhook

Run this command for local webhooks `stripe listen --forward-to localhost:3000/api/webhook`

## Usage

### Authentication

To begin using the app, users need to sign up or log in via the provided authentication service powered by Clerk.js.

![Clerk](https://i.imgur.com/zQQEzHm.png)

### Token Purchase

- Users can purchase tokens via the Stripe integration to gain access to the AI services.

![Tokens](https://i.imgur.com/P7aAmYb.png)

### Querying the AI

1. Select the desired AI function from the available options.
2. Use the tokens to make queries and interact with the AI.

## Tech Stack
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Contributing

We welcome contributions! If you'd like to improve this project, feel free to submit issues or pull requests.

![Video generation](https://i.imgur.com/7cVYrFI.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
