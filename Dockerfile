FROM nginx
COPY apps/ophai_diag_web_Refactor/dist /usr/share/nginx/html/web/
COPY apps/ophai_diag_doc/docs/.vitepress/dist /usr/share/nginx/html/doc/
# 复制配置文件
COPY default.conf /etc/nginx/conf.d/default.conf
# 可选：复制默认欢迎页面（如果使用方案2）
# COPY welcome.html /usr/share/nginx/html/