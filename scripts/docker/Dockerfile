FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -qqy --no-install-recommends \
    curl gnupg2 ca-certificates build-essential

# Install Node 14
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install yarn stable
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# Setup app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app
