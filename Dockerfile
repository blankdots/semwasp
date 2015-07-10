#SemanticUI FrontEnd Dockerfile v 0.1.0

# Base image
FROM debian:jessie

#Dockerfile maintainer
MAINTAINER blankdots <blankdots@gmail.com>

#export DEBIAN_FRONTEND noninteractive
ENV DEBIAN_FRONTEND noninteractive

#Install OS tools needed
RUN \
        apt-get update && \
	apt-get -y install nodejs && \
	apt-get -y install npm && \
	apt-get -y install git

#Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN apt-get autoremove -y

# Make symbolic link to "node" since code was written for OSX and linux refers to "node" as "nodejs"
RUN ln -s /usr/bin/nodejs /usr/bin/node

#Expose port 8000 for WebVOWL
#Expose port 35729 for livereload
EXPOSE 3000 9001

WORKDIR /

RUN git clone https://github.com/blankdots/gulp-SemanticUIFrontEnd.git /frontend
RUN \
	cd /frontend && \
	npm install && \
	npm install gulp-cli -g

# Set environment variables
ENV HOME /frontend

# Define working directory
WORKDIR /frontend

# Define default command
CMD ["gulp", "watch"]