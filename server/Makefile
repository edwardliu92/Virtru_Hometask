gen-swagger:
	@if ! command -v swag &> /dev/null; then \
		echo "swag is not installed. Please install it using:"; \
		echo "go install github.com/swaggo/swag/cmd/swag@latest"; \
		exit 1; \
	fi
	swag init --ot json