package main

import (
	_ "embed"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

//go:embed docs/swagger.json
var swaggerJSON []byte

const StatusHealthy = "healthy"
const StatusUnhealthy = "unhealthy"

type Healthz struct {
	Status  string `json:"status"`
	Details string `json:"message"`
}

type HealthzAggregated struct {
	Status     string             `json:"status"`
	Components map[string]Healthz `json:"components"`
}

type Wellknown struct {
	Services []string `json:"services"`
	DocPath  string   `json:"docs"`
}

//	@license.name	MIT
//	@license.url	http://opensource.org/licenses/MIT

// @title	Health Check API
func main() {
	host := ":8080"
	if os.Getenv("PORT") != "" {
		host = ":" + os.Getenv("PORT")
	}

	// Unused
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	w.WriteHeader(http.StatusOK)
	// })

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./swagger-ui")).ServeHTTP(w, r)
	})

	http.HandleFunc("/swagger.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(swaggerJSON)
	})

	http.HandleFunc("/.well-known", wellKnown)

	// Self health check
	http.HandleFunc("/healthz", healthCheck)

	// Health check endpoints
	http.HandleFunc("/health", healthCheckAggregated)
	http.HandleFunc("/health/", healthCheckService)

	// Start server
	log.Printf("Server started on port %s", host)
	if err := http.ListenAndServe(host, CORSMiddleware(http.DefaultServeMux)); err != nil {
		panic(err)
	}
}

// Serve the list of services and docs endpoint
// @Router		/.well-known [get]
// @Summary		List of services and docs endpoint
// @Description	List of services and docs endpoint
// @Produce		json
// @Success		200	{object}	Wellknown
func wellKnown(w http.ResponseWriter, r *http.Request) {
	wellknown := Wellknown{
		Services: services,
		DocPath:  fmt.Sprintf("http://%s/swagger.json", r.Host),
	}

	data, err := json.Marshal(wellknown)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

// @Router		/healthz [get]
// @Summary		Health check
// @Description	Health check for the Health Check API
// @Produce		json
// @Success		200	{object}	Healthz
func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok"}`))
}

// @Router		/health/{service} [get]
// @Summary		Health check for a specific service
// @Description	Health check for a specific service
// @Produce		json
// @Param			service	path		string	true	"Service name"
// @Success		200		{object}	Healthz
// @Failure		404		{string}	string	"service not found"
func healthCheckService(w http.ResponseWriter, r *http.Request) {
	var health Healthz
	service := r.URL.Path[len("/health/"):]

	// Find the service and generate health
	for _, s := range servicesList {
		if s.name == service {
			health = generateHealthz(s.sim)
			break
		}
	}

	// If service not found, return 404
	if health.Status == "" {
		http.Error(w, fmt.Sprintf("service %s not found", service), http.StatusNotFound)
		return
	}

	data, err := json.Marshal(health)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

// @Router		/health [get]
// @Summary		Aggregated health check
// @Description	Aggregated health check for the Health Check API
// @Produce		json
// @Success		200	{object}	HealthzAggregated
func healthCheckAggregated(w http.ResponseWriter, r *http.Request) {
	data, err := json.Marshal(generateHealthzAggregate())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

// Middleware to enable CORS on all requests
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")                                // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // Allow specific methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")     // Allow specific headers

		// If it's a pre-flight request (OPTIONS), respond with 200 status code
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Continue with the next handler
		next.ServeHTTP(w, r)
	})
}
