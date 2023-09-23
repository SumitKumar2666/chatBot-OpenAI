//import OpenAI from 'openai';
const OpenAI = require('openai');
const readline = require('readline');
require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"]
});

async function main() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    input.question('Enter your query to chatBot: ', (query) => {
        
      callChatBot(query);
      input.close();
    });

}

async function callChatBot(query){
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: query }],
            model: 'gpt-3.5-turbo',
            max_tokens: 3000,
            stream: true
          });
        
          for await(const chunk of chatCompletion){
            if(chunk.choices[0].delta.content !== undefined){
              process.stdout.write(chunk.choices[0].delta.content.toString()); 
            }
          }
    } catch (error) {
        console.log("Error: "+error);
    }
}
main();
//for keeping the conversation flowing
 // input.prompt();
    // input.on("line", async (input) => {
    //   await openai
    //     .chat.completions.create({
    //       model: "gpt-3.5-turbo",
    //       messages: [{ role: "user", content: input }],
    //     })
    //     .then((res) => {
    //       console.log(res.choices[0].message.content);
    //       input.prompt();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // });
