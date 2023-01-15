FROM nginx:alpine
COPY ./papillonRfashionA/dist/admin/ /usr/share/nginx/html
COPY ./papillonRfashionA/dist/landing/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf