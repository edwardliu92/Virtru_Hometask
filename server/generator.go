package main

import (
	"math/rand/v2"
)

const (
	simHealthy = iota
	simUnhealthy
	simFlaky
)

var unhealthyStates = []string{
	"High CPU Usage. CPU utilization exceeds 90%.",
	"Memory Leak. Available memory falls below 10% of the system capacity.",
	"Database Connection Failure. The service cannot connect to the database.",
	"Slow Response Time. The service response time exceeds 2 seconds.",
	"Dependency Failure. A required external service is unreachable or returns an error.",
	"Disk Space Low. Disk usage exceeds 95% of capacity.",
	"Expired TLS Certificate. The service TLS/SSL certificate has expired.",
	"Error Rate Spike. The service experiences an error rate above 5%.",
	"Configuration Mismatch. Missing or incorrect configuration values cause the service to behave incorrectly.",
	"Unapplied Migrations. The database schema is outdated due to unapplied migrations.",
}

type service struct {
	name string
	sim  int
}

var services = []string{
	"auth",
	"db",
	"cache",
	"search",
	"notifications",
	"analytics",
	"payment",
	"storage",
	"logging",
	"monitoring",
}

var servicesList = []service{}

func generateHealthz(sim int) Healthz {
	// If unhealthy or flaky, return a random unhealthy state
	if sim == simUnhealthy || (sim == simFlaky && rand.Float64() > .5) {
		return Healthz{Status: StatusUnhealthy, Details: unhealthyStates[rand.IntN(len(unhealthyStates))]}
	}
	return Healthz{Status: StatusHealthy}
}

func generateHealthzAggregate() HealthzAggregated {
	components := make(map[string]Healthz)
	for _, s := range servicesList {
		components[s.name] = generateHealthz(s.sim)
	}

	return HealthzAggregated{
		Status:     StatusHealthy,
		Components: components,
	}
}

func init() {
	for i, name := range services {
		s := service{name: name}
		switch {
		case i < 1:
			s.sim = simHealthy
		case i < 2:
			s.sim = simUnhealthy
		default:
			s.sim = simFlaky
		}
		servicesList = append(servicesList, s)
	}
}
