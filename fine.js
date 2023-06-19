/** @format */

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

//run this first then comment out func call
async function uploadFile() {
  try {
    const f = await openai.createFile(
      fs.createReadStream("yoga.jsonl"),
      "fine-tune"
    );
    console.log(`File ID ${f.data.id}`);
    return f.data.id;
  } catch (err) {
    console.log("err uploadfile: ", err);
    // console.log("error-------------------------------error");
  }
}
// uploadFile();

//run this 2nd, wait a bit, then comment out func call and move on
async function makeFineTune() {
  try {
    const ft = await openai.createFineTune({
      training_file: `file-AeCeZAbo7w582IrXTcFed5Um`,
      model: "davinci",
    });
    console.log(ft.data);
    console.log(ft.data.id);
    console.log(
      "-----------------------------------------------------------------------------------------------------"
    );
  } catch (err) {
    console.log("err makefinetune: ", err.response.data.error);
  }
}
// makeFineTune();

// 3. run,wait a bit, run again and get fine_tuned_model name
async function getFineTunedModelName() {
  try {
    const modelName = await openai.listFineTunes();
    // console.log(`modelName ${JSON.stringify(modelName.data.data)}`);
    console.table(modelName.data.data, ["id", "status", "fine_tuned_model"]);
  } catch (err) {
    console.log("err getmod: ", err);
  }
}
// getFineTunedModelName();

async function getFineTunedEventModelName() {
  try {
    const modelName = await openai.listFineTuneEvents(
      "ft-Vd3yKZJKdiQK7cTdpBJBBFRa",
      true
    );
    console.log(modelName.data);
  } catch (err) {
    console.log("err getmod: ", err);
  }
}
// getFineTunedEventModelName();

async function retrieveFineTuneData() {
  try {
    const retrieveFineTuneResponse = await openai.retrieveFineTune(
      "ft-Vd3yKZJKdiQK7cTdpBJBBFRa"
    );
    console.log(retrieveFineTuneResponse.data);
    return "ft-Vd3yKZJKdiQK7cTdpBJBBFRa";
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}
// retrieveFineTuneData();

async function run() {
  try {
    const comp = await openai.createCompletion({
      model: "davinci:ft-vanmla-2023-06-19-05-38-52",
      prompt: `What is  Prajwal Ramteke favorite part of coding`,
      max_tokens: 100,
      n: 1,
    });
    if (comp.data) {
      console.log("choices: ", comp.data.choices);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}
// run();
