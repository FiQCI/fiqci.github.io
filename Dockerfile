# Use Ruby 3.3.5 as base image
FROM ruby:3.3.5-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 22.10.0
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Verify versions
RUN ruby --version && node --version && npm --version

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY Gemfile Gemfile.lock ./
COPY package.json package-lock.json* ./

# Install bundler and Ruby gems
RUN gem install bundler
RUN bundle config set --local path 'vendor/bundle'
RUN bundle install

# Install Node.js packages
RUN npm install

# Copy the rest of the application
COPY . .

# Set up Jekyll source directory
ENV JEKYLL_ENV=development
ENV BUNDLE_PATH=vendor/bundle

# Expose port 4000 for Jekyll
EXPOSE 4000

# Default command - can be overridden in docker-compose
CMD ["npm", "run", "watch"]
