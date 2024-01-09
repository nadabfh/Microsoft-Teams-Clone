import React from "react"; 
import {useState} from "react";
import {sendMessage, isTyping} from "react-chat-engine";
import {SendOutlined, PictureOutlined} from "@ant-design/icons";
const MessageForm = (props) => {
    const [value, setValue] = useState('');
    const {chatId, creds} = props;
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the page from refreshing when the form is submitted
        const text = value.trim(); // trim() removes whitespace from both ends of a string
        if(text.length > 0) sendMessage(creds, chatId, {text}); // sendMessage is a function from react-chat-engine
        setValue('');
    }
    const handleChange = (event) => {  
        setValue(event.target.value); // event.target.value is the value of the input box
        isTyping(props, chatId);
    } 
    const handleUpload = (event) => {
        sendMessage(creds, chatId, {files: event.target.files, text: ''})
    }
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
            className="message-input"
            placeholder="Send a message..." // placeholder is the text that appears in the input box
            value={value}
            onChange={handleChange} // handleChange is a function that will be called when the input changes
            onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/> 
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{display: 'none'}}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon"/> 
            </button>
        </form>
    );
}

export default MessageForm;