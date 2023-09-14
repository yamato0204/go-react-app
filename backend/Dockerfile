# FROM golang:alpine
# RUN apk update && apk add git
# WORKDIR /app
# COPY . ./
# RUN go build -o main .
# CMD [ "/app/go/main" ]


FROM golang:1.20 as dev

RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY . .

CMD ["air", "-c", ".air.toml"]




# FROM golang:1.20.5-alpine as builder

# ENV ROOT=/go/src/app
# WORKDIR ${ROOT}

# RUN apk update && apk add git
# COPY go.mod go.sum ./
# RUN go mod download

# COPY . ${ROOT}

# RUN CGO_ENABLED=0 GOOS=linux go build -o $ROOT/binary

# FROM scratch as prod

# ENV ROOT=/go/src/app
# WORKDIR ${ROOT}
# COPY --from=builder ${ROOT}/binary ${ROOT}
# COPY .env ${ROOT}
# EXPOSE 8080
# CMD ["/go/src/app/binary"]












# 本番用の中間ステージ
#FROM golang:1.18.2-alpine3.15 as builder

#WORKDIR /app

#RUN apk update \
#    && apk add --no-cache git

#RUN go mod download

#COPY ./backend  ./

#RUN go build -o /main ./app/main.go

# 本番用ステージ
#FROM alpine:3.15 as prod
#COPY --from=builder /main .
#ENV PORT=8080
#CMD ["./main"]