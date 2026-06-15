# Use the official lightweight Node.js image
FROM node:24-slim

# Install system dependencies required by yt-dlp (Python and Curl)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Download the official Linux version of yt-dlp and make it executable globally
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# Create an alias link so your JS code calling 'yt-dlp.exe' routes perfectly to the Linux tool
RUN ln -s /usr/local/bin/yt-dlp /usr/local/bin/yt-dlp.exe

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests and install packages
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application files
COPY . .

# Run the bot
CMD ["node", "index.js"]