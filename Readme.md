# Virtru Take-home Challenge for Frontend Engineers

Welcome to the Virtru Take-home Challenge for Frontend Engineers! We're excited to see what you can do.

## Foreword

We know that interviewing is challenging, stressful, and time-consuming. While take-homes are not perfect,
we believe they can offer us a better understanding of your skills and how you approach problems, but
we also hope that you find this challenge more fun and less stressful than a typical whiteboard / leetcode
interview.

## Considerations

Since this is a take-home challenge we want to make sure you take these considerations into account:

- Spend no more that 5 - 10 hours on this challenge. If you feel like you can finish in less time,
  that's great! You will not be penalized or rewarded for finishing early or late.
- Please use React and TypeScript to build the application. We are looking for a modern frontend
  application that is easy to maintain and extend.
- Please avoid excessive use of third-party libraries. If you need to use a library, please justify
  your choice in the documentation.
- Please write documentation on your design decisions, trade-offs, and any assumptions you made.
- Please read the Evaluation Criteria section below to understand how we will evaluate your submission.

## Evaluation Criteria

To make sure you are set up for success, we want to be transparent about how we will evaluate your
submission. What we are NOT looking for is a perfect solution. Please focus on the criteria and avoid
over-engineering, optimization, or feature creep.

What we are looking for:

- [ ] **Clarity**: Can we understand your code? Is it easy to read and maintain?
  - We are looking to see how clear it is to read and understand your code.
  - We are considering consistency in code style, clear separation of concerns, and a logical structure.
- [ ] **Communication**: Are you managing our expectations? Does it work as expected?
  - We are looking to see if your work is well-communicated, setting expectations, and meeting them.
  - We are looking for a few comments in the code to explain complicated parts, if any.
- [ ] **Completeness**: Does the code fulfill the requirements? Are there assurances that it works?
  - We are looking to see if you have completed the requirements of the challenge.
  - Do you have a few tests to assure it functions as expected and constraint trade-offs.
- [ ] **Safety**: Have you considered security vulnerabilities? Are you handling errors?
  - We are looking to see if you have considered security implications.
    - Are you following OWASP [basic security considerations](https://owasp.org/www-project-developer-guide/draft/design/web_app_checklist/)?
- [ ] **Creativity**: Does it solve the problem? Why would customers love your solution?
  - We are looking to see how you thought about the problem with empathy for users.
  - We are looking for creative solutions with a focus on balancing customer experience, time, and
    functionality.

## Problem Statement

We want to make sure this take-home helps you to understand the kind of problems we are solving at Virtru.
We run a platform with many services and each service has its own health status. This is a common and
simplistic form of monitoring that helps customers understand the health of their systems.

There are many examples of health checks in the wild, but we are going to focus on a simple one. We
have an API that returns the health of the system and its services. The API is a simple REST API that
returns the health of the system and its services. Some of the services are always healthy, some are
always unhealthy, and some are flakey.

### Goal

Your task is to build a simple frontend application that shows the health of the system and its various
services. The application should use the provided API to fetch the services and their health status.

Users should be able to see the overall health of a system and the health of individual services. However,
since there are many services, a user might only care about a few services. Depending on the user
persona, they might want to only see the health of a few services to avoid alert fatigue or other cognitive
overload.

Often times when a service is unhealthy, we want to share the information with the user. We should
consider permanence of sharing this information especially when a service is flakey or unhealthy. Maybe
it was down for Bob when he shared, but it's up for Alice when she views it. How do we handle this?

Finally, we are open to creative solutions, but sometimes our solutions are inspired by the real world.
You are welcome to use real-world examples to inspire your solution, but please make sure to document
your inspiration and how it applies to the problem.

### Requirements

- [ ] Write a one page README explaining your design decisions, trade-offs, and any assumptions as well
      as any instructions on how to run your application.
- [ ] Use React and TypeScript to build the application.
- [ ] Show the overall health of the systems and the health of individual services
- [ ] Allow users to view the health of individual services
- [ ] Allow users to select which services they want to see
- [ ] Service health should be updated every 5 seconds to simulate real-time updates
- [ ] Alert the user when the service status changes
- [ ] Allow users to manually share links with the status of the service in a point-in-time
      When loading page with shared link we should see the difference in status from point-in-time

_Note:_ There is no database so we are not expecting the service status to be saved between sessions
or when sharing links.

### Development

- This take-home assessment focuses on the frontend, so there should only be a need to change files in [the web directory](./web/).
- To run the [server](./server/), there are two options:
  - Utilize [docker](https://docs.docker.com/) and the provided [Dockerfile](./Dockerfile) to build and run the container.
    - In the repo root: `docker build -t virtru-frontend-takehome-server . && docker run -p 8080:8080 virtru-frontend-takehome-server`
  - _Optionally_, you can use [Go](https://pkg.go.dev/std) to build and run the server on your machine, but please don't
    waste time on this unless you are comfortable with Go.
