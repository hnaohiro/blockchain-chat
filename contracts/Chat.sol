pragma solidity ^0.4.22;

contract Chat {

  struct Message {
    address owner;
    int8 messageType; // 0:text, 1:image
    string text;
    string imageUrl;
    uint256 timestamp;
  }

  Message[] private messages;

  function sendText(string _text) public {
    Message memory message = Message({
      owner: msg.sender,
      messageType: 0,
      text: _text,
      imageUrl: "",
      timestamp: now
    });
    messages.push(message);
  }

  function sendImage(string _imageUrl) public {
    Message memory message = Message({
      owner: msg.sender,
      messageType: 1,
      text: "",
      imageUrl: _imageUrl,
      timestamp: now
    });
    messages.push(message);
  }

  function getLength() public view returns (uint256) {
    return messages.length;
  }

  function getMessage(uint256 _index) public view returns (address owner, int8 messageType, string text, string imageUrl, uint256 timestamp) {
    require(_index < getLength());
    Message memory message = messages[_index];
    return (message.owner, message.messageType, message.text, message.imageUrl, message.timestamp);
  }
}
