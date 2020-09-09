# Udacity_capstone


This is simple project that build on microservice architecture which develops on container-based on orchestration tool (Kubernetes)

The project consists on
1. *udacity-frontend* - For Ionic client web application, which consumes the RestAPI Backend
2. *udacity-restapi-feed* - For "feed" microservice
3. *udacity-restapi-user* - For "user" microservice
4. *udacity-reverseproxy* - For running the Nginx as a reverse-proxy server
5. *udacity-validation* - For validate image file name to prevent some reversed word from using as file names

Build the application
1. Run udacity-c3-deployment\docker\ build.cmd *shell scrpit to build all images*
2. Run udacity-c3-deployment\docker\ push.cmd *shell script to push all images to the docker hub account*
3. Run udacity-c3-deployment\k8s\all.cmd *Shell script to apply all secret-configmap-deploymentservice for all service*
4. Run udacity-c3-deployment\k8s\forward frontend.cmd *Shell script to forward port for frontend services*
5. Run udacity-c3-deployment\k8s\forward reverseproxy.cmd *Shell script to forward port for reversproxy services*
6. Run udacity-c3-deployment\k8s\forward validation.cmd *Shell script to forward port for validation services*



