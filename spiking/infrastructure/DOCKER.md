# Docker Tutorial

## Download Docker Desktop your operating system

[Docker Desktop Link](https://www.docker.com/)

### What is Docker?

- Docker allows you to deploy your app on any machine
- It bundles up all the code and dependencies to run a piece of software - which speeds up the development and deployment of applications
- The same Docker commands can be used to run the application on any machine e.g. Docker
- The lightweight containers are more efficient that using a virtual machine, this results in faster app start up times
- It acts as a version control system, similar to Git but for apps
- Scalability - multiple applications can be created from 1 Docker Image, like creating multiple cakes from 1 recipe

## How does Docker Work?

### Images

- Images are like a recipe for building an application, it contains the code,runtime, libraries and any other dependencies the software requires to run
- E.g. node.js, express.js, react, operating system (Windows, MacOS, Linux etc)
- Images are lightweight, standalone and executable packages

### Containers

- A container is a runnable instance of a Docker image
- it is an execution environment for a specific application
- Containers take everything inside the image and follows the instructions by executing necessary commands, installing packages, and setting everything up to run the application
- Docker image = recipe, Container = baked cake
- You can create multiple containers from a single image

## Docker Volume

- Persistent data storage mechanism
- Allows dat to be shared between various Docker containers and a host machine (computer/server)
- Ensures data durability and persistence
- If a container is stopped or removed we don't lose any data
- It is essentially a shared folder / storage compartment

### Docker Network

- Communication channel that allows different Docker clients to talk to each other or with the external world
- Creates connections that allow containers to share instructions, dependencies etc between each other

### Docker Client

- UI for interacting with Docker
- Command Line Interface or Graphic User Interface (Docker Desktop)
- This allows you to build, run and manage images/containers

### Docker Host (Docker Daemon)

- Manages containers on the host system
- Listens for Docker Client Commands
- Creates / manages containers

### Docker Repository (Docker Hub)

[Docker Hub Link](hub.docker.com)

- This is a centralized repository of Docker Images
- Similar to how GitHub - other developers can build images are store them on Docker Hub for others to use
- If Docker cannot find an image locally it may pull one from Docker Hub

### Dockerfile - Common commands

- Docker file contains syntax / commands to tell DOcker how to build an image for the applications

```dockerfile
    # FROM image[:tag] [AS name]
    # Specifies the base image to use for the new image
    FROM ubuntu:20.04

    # WORKDIR /path/to/workdir
    # Sets the working directory for the new image - where to build the application
    WORKDIR /app

    # COPY [--chown=<user>:<group>] <src>... <dest>
    # Copies the files or directories from the build contents to the image
    COPY . /app

    # RUN <command>
    # Executes commands in the shell during image build
    RUN npm run dev

    #EXPOSE <port> [<port>/<protocol>...]
    # Informs Docker that the container will listen on specified ports on runtime
    EXPOSE 3000

    # ENV KEY=VALUE
    # Sets the environment variables during the build process
    ENV NODE_ENV=production

    # ARG <name>[=<default value>]
    # Defines build time variables - decides which versions of dependencies you want to use
    ARG NODE_VERSION=20

    # VOLUME ["/data"]
    # Creates a mount point for externally mounted volumes - specifies a location inside your container where you can connect external storage
    VOLUME /myvol

    # CMD ["executable", "param1", "param2"]
    # Provides default commands to execute when the container starts - can be overwritten when running the container
    CMD command param1 param1
    CMD npm run dev
```
