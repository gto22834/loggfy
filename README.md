# PackConsole

## Install

- $ npm install pack-console

## Introduction

Pack all concole message for easy debug.

| Log level | Mean | Note |icon|
|-----------|------|------|----|
|LOG| Develop adjust|console.log|none|
|INFO| Record the data from api|console.info|i|
|WARN| Warning|console.warn|!|
|ERROR| The error message|console.error|x|

## Benefit

1. Help to find the bug.
2. Contribute to module testing.

## Important

[The console affect]

1. Yes, it will reduce the speed, though only negligibly.
3. But, don't use it as it's too easy for a person to read your logs.

## Usage

```js
let debug = PackConsole;
debug.error('ERROR'); // 'ERROR'
```

## TODO:

- [ ] Style the console
- [ ] suffix the console
- [ ] elastic
- [ ] sentry

[The console affect]:https://stackoverflow.com/questions/11426185/will-console-log-reduce-javascript-execution-performance
