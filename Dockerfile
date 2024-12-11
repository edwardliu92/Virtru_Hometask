FROM golang:1.23 AS builder

COPY ./server/ .

RUN CGO_ENABLED=0 GOOS=linux go build -v -a -installsuffix cgo -o /go/bin/server

# Final image using ubuntu for ease of debugging
FROM ubuntu

COPY --from=builder /go/bin/server /server

EXPOSE 8080
CMD ["/server"]