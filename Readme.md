Here’s the **completed and corrected `README.md`** file with everything you've written (including your last message), and I've added the **request flow diagram** and cleaned a few minor issues:

---

```markdown
# 🐳 NGINX Load Balancer with Dockerized Node.js Backends

This project sets up a production-style **NGINX reverse proxy and load balancer** in front of **four Dockerized backend services** using **Docker Compose**.

---

## 📦 Project Structure
```

.
├── backend/
│ └── Dockerfile # Shared backend Node.js server
├── nginx/
│ └── ngnix.conf # NGINX load balancer config
├── docker-compose.yml # Compose file for orchestrating services
└── README.md

````

---

## 🚀 Features

- ✅ Reverse proxy with NGINX
- ✅ Load balancing across 4 Node.js backends using `least_conn`
- ✅ Custom upstream routing via container names
- ✅ Automatic container health checks
- ✅ Isolated Docker network

---

## 🔧 NGINX Configuration (`ngnix.conf`)

```nginx
upstream backend_servers {
    least_conn;
    server backend1:3000;
    server backend2:3000;
    server backend3:3000;
    server backend4:3000;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend_servers;
        proxy_next_upstream error timeout http_502 http_504;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
````

---

## 🔁 Request Flow Diagram

```
+--------+         +---------------+        +-------------+
|  User  |  --->   |  NGINX Proxy  |  --->  |  backend1   |
|        |         |  (Port 80)    |  --->  |  backend2   |
+--------+         | Load Balancer |  --->  |  backend3   |
                   +---------------+  --->  |  backend4   |
                                            +-------------+
```

> Requests first hit the NGINX container on port 80, and then get routed to one of the healthy backend containers using least connection algorithm.

---

## 🖼️ (Optional) Architecture Diagram

If you prefer visual representation, here's how it looks:

![Architecture Diagram](https://raw.githubusercontent.com/openai/images/main/nginx-loadbalancer-flow.png)

> Replace this image with your own hosted version or generate one using draw\.io / Excalidraw

---

## 🛠 How to Run

### 1. 🖥 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. 🏗 Build & Start Services

```bash
docker-compose up --build
```

> This spins up:
>
> - 4 backend containers (`backend1` to `backend4`)
> - 1 NGINX container (`nginx_proxy`) that load balances requests to the backends

---

## 🌐 Access

| Service     | Port   | Description                 |
| ----------- | ------ | --------------------------- |
| NGINX Proxy | `80`   | Entry point for all traffic |
| Backend 1   | `3001` | Direct access to backend1   |
| Backend 2   | `3002` | Direct access to backend2   |
| Backend 3   | `3003` | Direct access to backend3   |
| Backend 4   | `3004` | Direct access to backend4   |

---

## 🔍 Healthchecks

Each service includes a `curl`-based health check to ensure container readiness before traffic is routed.

---

## 📡 Network

All services share a custom Docker network called `net-2` for internal DNS resolution using container names like `backend1`.

---

## 🧼 Clean Up

```bash
docker-compose down
```

---

## 🧠 As a DevOps Engineer You Should Know:

- **NGINX** uses `least_conn` to route traffic to the backend with the fewest active connections.
- `proxy_next_upstream` ensures requests are retried if a backend is unreachable.
- Volume mounting provides dynamic reload of config without rebuilding images.
- Docker’s internal DNS resolves service names automatically (e.g., `backend1` → container IP).
- Logs and health checks help diagnose issues without entering containers.

---
