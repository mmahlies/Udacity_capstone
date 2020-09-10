# Udacity_capstone


This is simple project that build on microservice architecture which develops on container-based on orchestration tool (Kubernetes)

The project consists on
1. *udacity-frontend* - For Ionic client web application, which consumes the RestAPI Backend
2. *udacity-restapi-feed* - For "feed" microservice
3. *udacity-restapi-user* - For "user" microservice
4. *udacity-reverseproxy* - For running the Nginx as a reverse-proxy server
5. *udacity-validation* - For validate image file name to prevent some reversed word from using as file names validate the Feed/signed-url EndPoint
so that we apply chained microservice desgin pattern 

![](ScreenShot/architecture.png)

Services Description 
* “user” - allows users to register and log into a web client, 
* “feed” - allows users to post photos, and process photos using image filtering 
* "validation" allow feed services to validate uploaded file to be valid so we decouple the two business 
   into two different microservices
* “frontend” - acts as an interface between the user and the backend-services
* "reverseproxy" - For resolving multiple services running on same port in separate containers

Correspondingly, the project is split into following parts:
1. The RestAPI Feed Backend, a Node-Express feed microservice.
1. The RestAPI User Backend, a Node-Express user microservice.
1. The RestAPI Validation Backend, a Node-Express user microservice.
1. The Simple Frontend - A basic Ionic client web application which consumes the RestAPI Backend.
1. Nginx as a reverse-proxy server, when different backend services are running on the same port, then a reverse proxy server directs client requests to the appropriate backend server and retrieves resources on behalf of the client.  

Technical details
1. Front end application hosted on port 8100
1. Reverese proxy service hosted on port 8080 and load balancing request by mapping
    .  location /api/v0/feed  ==> Feed service
    .  location /api/v0/users ==> user service
    .  location /api/v0/validation ==> validation service      
1. all services all dockarised
1. all service can host on kubernates cluster and take advantage of kubernates tool like
   scale up, A/B testing, zero down time, ... etc
   
Build the application
1. Run udacity-c3-deployment\docker\ build.cmd *shell scrpit to build all images*
2. Run udacity-c3-deployment\docker\ push.cmd *shell script to push all images to the docker hub account*
3. Run udacity-c3-deployment\k8s\all.cmd *Shell script to apply all secret-configmap-deploymentservice for all service*
4. Run udacity-c3-deployment\k8s\forward frontend.cmd *Shell script to forward port for frontend services*
5. Run udacity-c3-deployment\k8s\forward reverseproxy.cmd *Shell script to forward port for reversproxy services*
6. Run udacity-c3-deployment\k8s\forward validation.cmd *Shell script to forward port for validation services*


**Note that

By default Kubernetes offer RollingUpdate strategy feature is set to RollingUpdate that allow us to update the container with Zero downtime and build System which enhanced in resiliency 
Two versions  but some  deployment run in one replicas set due to local cpu limit 
- 'A' and 'B' of the same application can run simultaneously and serve the traffic by scaling up/scaling down , but some  deployment run in one replicas set due to local cpu limit 

