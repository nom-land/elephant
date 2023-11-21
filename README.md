# Elephant
Extract structured data from web pages using the OpenAI API.

## Install
```bash
npm install @nomland/elephant
```

## Configure environment variables
| Variable       | Value                                                              |
|----------------|--------------------------------------------------------------------|
| OPENAI_MODEL   | The OpenAI model name (gpt-3.5-turbo-16k or gpt-4-1106-preview recommended) |
| OPENAI_API_KEY | Your OpenAI API key                                                |

To use an Azure OpenAI endpoint, visit the [Typechat documentation](https://microsoft.github.io/TypeChat/docs/examples/).

## Usage
Run examples:  
```bash
npm run start
```

or use elephant in project  
```
import {extract} from @nomland/elephant

await extract('https://test.com/example-page')
```

## TODO
Move examples to ./examples
Extract IPFS url if existed