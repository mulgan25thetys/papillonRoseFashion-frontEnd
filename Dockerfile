FROM nginx:alpine
COPY dist/admin/ /usr/share/nginx/html
COPY dist/landing/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf