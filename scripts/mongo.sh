docker run -d \
  --name mongo \
  -p 27017:27017 \
  -v ~/dev/private/mongo_data:/data/db \
  mongo:3.4
