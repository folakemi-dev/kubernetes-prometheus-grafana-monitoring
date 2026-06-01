## Architecture

This project implements a complete monitoring and observability stack on Amazon EKS.

```text
                    Amazon EKS Cluster
                           │
          ┌────────────────┴────────────────┐
          │                                 │
   Monitoring Namespace               Apps Namespace
          │                                 │
          │                                 │
   ┌──────┴────────┐                ┌───────┴─────────┐
   │               │                │                 │
Prometheus      Grafana         Node.js App        Redis
   │                                │               │
   │                                │               │
   ├── Node Exporter                │               │
   ├── kube-state-metrics           │               │
   ├── Alertmanager                 │               │
   └── Prometheus Operator          │               │
                                    │               │
                                    └──────┬────────┘
                                           │
                                    Redis Exporter
                                           │
                                           ▼
                                      Prometheus
                                           │
                                           ▼
                                        Grafana
                                           │
                                           ▼
                                      Dashboards
```

### Monitoring Flow

1. Applications expose metrics through `/metrics`.
2. Prometheus scrapes metrics from configured targets.
3. Metrics are stored as time-series data.
4. Grafana queries Prometheus for visualization.
5. Alertmanager processes alert conditions.
6. Notifications are generated when thresholds are exceeded.
7. Dashboards provide real-time visibility into cluster health.