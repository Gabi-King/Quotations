import multiprocessing

proc_name = "quotations_flask"
bind = "0.0.0.0:5000"
accesslog = "-"
errorlog = "-"
loglevel = "info"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 600
graceful_timeout = 600
max_requests = 1000
max_requests_jitter = 0
