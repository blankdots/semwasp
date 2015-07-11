#SemanticUI FrontEnd Dockerfile v 0.1.0

FROM node

# Install Bower & Gulp
RUN npm install -g bower gulp

#Dockerfile maintainer
MAINTAINER blankdots <blankdots@gmail.com>

#Expose port 8000 for WebVOWL
#Expose port 35729 for livereload
EXPOSE 3000 9001

WORKDIR /

RUN git clone https://github.com/blankdots/gulp-SemanticUIFrontEnd.git /frontend
RUN \
	cd /frontend && \
	npm install

# Set environment variables
ENV HOME /frontend

# Define working directory
WORKDIR /frontend

# Define default command
CMD ["gulp", "watch"]