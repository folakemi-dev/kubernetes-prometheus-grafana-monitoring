## Common Troubleshooting Scenarios

### Grafana Login Issues
- Verify Grafana admin credentials.
- Retrieve the password from Kubernetes secrets if necessary.

### Prometheus Targets Showing DOWN
- Check ServiceMonitor configuration.
- Verify labels and application endpoints.
- Confirm target status in Prometheus Targets page.

### Missing Application Metrics
- Ensure the application exposes a `/metrics` endpoint.
- Verify Prometheus is scraping the service correctly.

### Redis Metrics Not Available
- Confirm Redis Exporter is running.
- Check Redis connectivity and Prometheus targets.

### Alerts Not Firing
- Validate PrometheusRule expressions.
- Verify alert evaluation intervals and Prometheus rules.

### AWS Resources Remaining After Cleanup
- Verify deletion of EKS clusters, EC2 instances, Load Balancers, EBS volumes, Elastic IPs, and CloudFormation stacks to avoid unnecessary costs.

### Kubernetes Pod Failures
Useful troubleshooting commands:

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```