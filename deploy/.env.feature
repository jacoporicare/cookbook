API_IMAGE=${API_IMAGE}
WEB_IMAGE=${WEB_IMAGE}
LETSENCRYPT_EMAIL=${LETSENCRYPT_EMAIL}
JWT_SECRET=${JWT_SECRET}
OPENAI_API_KEY=${OPENAI_API_KEY}

API_HOST=api-${GITHUB_REF_NAME}.zradelnik.cz
WEB_HOST=${GITHUB_REF_NAME}.zradelnik.cz

APOLLO_EXPLORER_ENABLED=true
NEW_RECIPES_TOPIC=new_recipes.debug

# Recipe image storage (S3). Bucket/region are public config; the IAM key
# (zradelnik-app) is injected from the deploy environment / CI secrets.
S3_BUCKET=zradelnik-recipe-images
AWS_REGION=eu-central-1
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
