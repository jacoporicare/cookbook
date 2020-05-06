# Preparation

This Lambda uses `sharp` which uses `node-gyp` so it compiles native binaries. Because AWS Lambda runs on Linux you have prepare `node_modules` for Linux. So just run:

```sh
./install-node_modules.sh
```

# AWS Lambda Installation

```sh
./aws-create.sh
```

# AWS Lambda Update

```sh
./aws-update.sh
```
