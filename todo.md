```
 touch .gitignore
```

```
touch .nvmrc
```

- put the nodejs stable version in that

```
touch mkdir src
```

```
npm init
```

```
npm i -D typescript
```

```
npx tsc --init
```

```
npx tsc
```

```
npm i -D @types/node
```

```
npm install --save-dev --save-exact prettier &&
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
&&  node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
```
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 4
}
```
```
npm install --save-dev eslint @eslint/js typescript-eslint
```
