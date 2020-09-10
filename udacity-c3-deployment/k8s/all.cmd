kubectl apply -f aws-secret.yaml
 
kubectl apply -f  env-configmap.yaml
 
 kubectl delete secret/env-secret
kubectl create secret generic env-secret --from-literal=POSTGRESS_USERNAME="postgres" --from-literal=POSTGRESS_PASSWORD="database-1"
 
kubectl apply -f  backend-feed-deployment.yaml
 
kubectl apply -f  backend-feed-service.yaml
 
kubectl apply -f  backend-user-deployment.yaml
 
kubectl apply -f  backend-user-service.yaml
 
kubectl apply -f  backend-feed-service.yaml
 
kubectl apply -f  frontend-deployment.yaml
 
kubectl apply -f  frontend-service.yaml
 
kubectl apply -f  validation-deployment.yaml
 
kubectl apply -f  validation-service.yaml

 kubectl apply -f  reverseproxy-deployment.yaml
 
kubectl apply -f  reverseproxy-service.yaml





PAUSE 

