/** @format */

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

async function uploadFile() {
  try {
    const file = fs.createReadStream("yoga.jsonl");
    const response = await openai.createFile(file, "fine-tune");
    console.log(`File ID: ${response.data.id}`);
    return response.data.id;
  } catch (err) {
    console.log("Error uploading file: ", err);
  }
}

// uploadFile();

async function makeFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: "file-rUufT4PqAto8FveE2GGXmBi4",
      model: "davinci",
    });
    console.log(response.data);
    console.log(response.data.id);
    console.log("--------------------------------------------");
  } catch (err) {
    console.log("Error creating fine-tune: ", err.response.data.error);
  }
}

// makeFineTune();

async function getFineTunedModelName() {
  try {
    const modelName = await openai.listFineTunes();
    console.table(modelName.data.data, ["id", "status", "fine_tuned_model"]);
  } catch (err) {
    console.log("Error getting fine-tuned model names: ", err);
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
    console.log("Error getting fine-tuned event model name: ", err);
  }
}

// getFineTunedEventModelName();

async function retrieveFineTuneData() {
  try {
    const response = await openai.retrieveFineTune(
      "ft-Vd3yKZJKdiQK7cTdpBJBBFRa"
    );
    console.log(response.data);
    return "ft-Vd3yKZJKdiQK7cTdpBJBBFRa";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// retrieveFineTuneData();

async function run() {
  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-personal-2023-06-20-06-08-03",
      prompt: "How to refer",
      max_tokens: 100,
      n: 1,
    });
    if (response.data) {
      console.log("Choices:", response.data.choices);
    }
  } catch (err) {
    console.log("Error running completion: ", err);
  }
}

run();
