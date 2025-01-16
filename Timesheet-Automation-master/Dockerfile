FROM node:20-bullseye
 
WORKDIR /app
 
# Kopiowanie plików package.json
COPY package*.json ./
 
# Instalacja zależności
RUN npm install
 
# Instalacja Playwrighta z wymaganymi zależnościami
RUN apt-get update && apt-get install -y \
    libjpeg62-turbo \
    libenchant-2-2 \
    libvpx6 \
    libevent-2.1-7 \
&& apt-get clean
 
# Instalacja Playwrighta
RUN npx playwright install --with-deps
 
# Kopiowanie reszty plików
COPY . .
 
CMD ["npm", "start"]