# Elephant
Extract metadata from webpage.

## Install
```bash
npm install elephant-sdk
```

## Configure environment variables
| Variable       | Value                                                              |
|----------------|--------------------------------------------------------------------|
| OPENAI_MODEL   | The OpenAI model name (gpt-3.5-turbo-16k or gpt-4-32k recommended) |
| OPENAI_API_KEY | Your OpenAI API key                                                |

To use an Azure OpenAI endpoint, visit the [Typechat documentation](https://microsoft.github.io/TypeChat/docs/examples/).

## Usage
Run examples:  
```bash
npm run start
```

or use elephant-sdk in project  
```
import {extract} from elephant-sdk

await extract('https://test.com/example-page')
```