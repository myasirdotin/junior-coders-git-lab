# Docker Setup for Yasir Rasool

## Quick Start

### Option 1: Using Docker Compose (Recommended)
```powershell
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Option 2: Using Docker directly
```powershell
# Build the image
docker build -t junior-coders .

# Run the container
docker run -p 8080:80 -d junior-coders
```

## Access the Application

- Local: http://localhost:8080
- The container serves all HTML modules from Learning HTML, Learning CSS, and Learning JS folders

## File Structure

```
junior-coders-git-lab/
├── Dockerfile           # Docker image configuration
├── docker-compose.yml   # Docker Compose setup
├── nginx.conf          # Nginx server configuration
├── Learning HTML/      # HTML learning modules
├── Learning CSS/       # CSS learning modules
└── Learning JS/       # JavaScript learning modules
```

## Common Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start container in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose build --no-cache` | Rebuild without cache |
| `docker-compose logs` | View container logs |
| `docker-compose restart` | Restart the container |

## Troubleshooting

- **Port 8080 already in use**: Change port in `docker-compose.yml`
- **Container won't start**: Check logs with `docker-compose logs`