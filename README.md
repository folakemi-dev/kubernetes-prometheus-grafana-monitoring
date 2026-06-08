# Kubernetes Prometheus Grafana Monitoring on Amazon EKS

Production-style Kubernetes observability project on Amazon EKS using Prometheus, Grafana, Alertmanager, Redis Exporter, and a custom Node.js application that exposes Prometheus metrics.

## What This Project Demonstrates

- Deploying an observability stack on Amazon EKS.
- Exposing custom Node.js application metrics through `/metrics`.
- Scraping application and Redis metrics with Prometheus ServiceMonitors.
- Visualizing cluster, application, and Redis metrics in Grafana.
- Defining alert rules for service and Redis availability.
- Troubleshooting Kubernetes monitoring components.
- Cleaning up AWS resources to control cloud cost.

## Architecture

```text
Amazon EKS Cluster
|
+-- monitoring namespace
|   |
|   +-- Prometheus
|   +-- Grafana
|   +-- Alertmanager
|   +-- Prometheus Operator
|   +-- kube-state-metrics
|   +-- node-exporter
|
+-- apps namespace
    |
    +-- Node.js application
    |   |
    |   +-- /health
    |   +-- /metrics
    |
    +-- Redis
    +-- Redis Exporter

Prometheus -> Grafana dashboards
Prometheus -> Alertmanager alerts
```

## Tech Stack

| Area | Tools |
|---|---|
| Cloud | AWS, Amazon EKS |
| Container orchestration | Kubernetes, kubectl, eksctl |
| Monitoring | Prometheus, Prometheus Operator, ServiceMonitor |
| Dashboards | Grafana |
| Alerting | Alertmanager, PrometheusRule |
| Application metrics | Node.js, Express, prom-client |
| Data service metrics | Redis, Redis Exporter |

## Repository Structure

```text
.
|-- alerts/
|-- app/
|-- docs/
|-- infra/
|-- k8s/
|-- monitoring/
|-- screenshots/
`-- README.md
```

## Application Metrics

The sample Node.js service exposes:

- `GET /` for the application response.
- `GET /health` for health checks.
- `GET /metrics` for Prometheus scraping.

Custom metric included:

```text
nodeapp_http_requests_total
```

## Monitoring Coverage

| Target | Evidence |
|---|---|
| EKS cluster resources | Grafana Kubernetes dashboard |
| Node.js app availability | Prometheus target and custom metric query |
| Redis availability | Redis Exporter and Prometheus Redis target |
| Alerts | Prometheus rules and firing alert screenshots |
| Cleanup | AWS cleanup confirmation screenshot |

## Screenshots

| Area | Screenshot |
|---|---|
| EKS cluster | `screenshots/01-eks-cluster-active.png` |
| Monitoring pods | `screenshots/03-monitoring-pods-running.png` |
| Prometheus targets | `screenshots/07-prometheus-targets.png` |
| Node.js metrics endpoint | `screenshots/10-nodeapp-metrics-endpoint.png` |
| Node.js Grafana dashboard | `screenshots/21-grafana-nodeapp-dashboard.png` |
| Redis Grafana dashboard | `screenshots/22-grafana-redis-dashboard.png` |
| Alert firing | `screenshots/18-redis-alert-firing.png` |

## Key Commands

Create the EKS cluster:

```bash
eksctl create cluster -f infra/eks-cluster.yaml
```

Deploy application resources:

```bash
kubectl apply -f k8s/
```

Apply monitoring configuration:

```bash
kubectl apply -f monitoring/
kubectl apply -f alerts/
```

Check Prometheus targets:

```bash
kubectl get servicemonitor -A
kubectl get prometheusrule -A
kubectl get pods -A
```

## Documentation

- [Project architecture](docs/project-architecture.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Cost control](docs/cost-control.md)

## What I Learned

- How Prometheus discovers Kubernetes workloads through labels and ServiceMonitors.
- How custom application metrics connect to dashboards and alerting.
- How Redis Exporter exposes service-specific metrics.
- How to debug target discovery, missing metrics, and alert behavior.
- Why cleanup verification is part of responsible cloud engineering.

## Recruiter Notes

This project shows practical observability work beyond a simple deployment: metrics instrumentation, target discovery, dashboards, alerts, troubleshooting, and AWS cost-control documentation.
