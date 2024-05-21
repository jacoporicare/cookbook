# Žrádelník

## Git Secret

API project contains encrypted Firebase config in the repository. In order to decrypt it you have to use Git Secret and know the passphrase.

Install Git Secret
```sh
brew install git-secret
```

Decrypt all added files
```sh
git secret reveal
```
