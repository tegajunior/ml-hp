import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import env from "react-dotenv";
import "./Translator.css";

const Translator = () => {
  const [formData, setFormData] = useState({ message: "" });
  const [translatedText, setText] = useState("Translated text");
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const translate = async () => {
    const { message } = formData;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    if (response.status === 200) {
      setText(response.data.choices[0].text.trim());
    } else {
      setText("Could not translate your text");
    }
    setIsLoading(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.message.trim() == "") {
      return;
    }
    setIsLoading(true);
    translate();
  };
  return (
    <div className="container">
      <h1>Translator</h1>
      <form onSubmit={handleOnSubmit}>
        <textarea
          name="message"
          placeholder="Type your text here"
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Translate</button>
      </form>
      {isLoading && <BeatLoader />}
      {!isLoading && <div className="translated">{translatedText}</div>}
    </div>
  );
};

export default Translator;
