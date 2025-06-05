# Comandos para configurar VM

## 1. Actualizar los paquetes del sistema
sudo dnf update -y

## 2. Instalar Docker
sudo dnf install docker -y

## 3. Iniciar el servicio Docker
sudo systemctl start docker

## 4. Habilitar Docker al iniciar el sistema
sudo systemctl enable docker

## 5. (Opcional) Permitir usar Docker sin sudo
sudo usermod -aG docker ec2-user

## 6. Aplicar cambios en docker
newgrp docker

## 7. Verificar estado de docker
sudo systemctl status docker

## 8. Verificar procesos ejecutandose en docker
docker ps

## 9. Instalar CURL
sudo yum install curl -y

## 10. Configurar como ejecutable
chmod +x iniciar.sh