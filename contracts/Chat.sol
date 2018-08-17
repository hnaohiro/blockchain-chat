pragma solidity ^0.4.22;

contract Chat {

  struct Message {
    uint256 index;
    address owner;
    int8 messageType; // 0:text, 1:image
    string text;
    string imageUrl;
    uint256 timestamp;
  }

  struct User {
    string name;
    string avatarUrl;
  }

  event MessageAppended(uint256 index);

  Message[] private messages;

  mapping (address => User) private addressToUser;

  function appendMessage(int8 _messageType, string _text, string _imageUrl) internal {
    uint256 index = messages.length;

    Message memory message = Message({
      index: index,
      owner: msg.sender,
      messageType: _messageType,
      text: _text,
      imageUrl: _imageUrl,
      timestamp: now
    });

    messages.push(message);
    emit MessageAppended(index);
  }

  function sendText(string _text) public {
    appendMessage(0, _text, "");
  }

  function sendImage(string _imageUrl) public {
    appendMessage(1, "", _imageUrl);
  }

  function getLength() public view returns (uint256) {
    return messages.length;
  }

  function getMessage(uint256 _index) public view returns (uint256 index, address owner, int8 messageType, string text, string imageUrl, uint256 timestamp) {
    require(_index < getLength());
    Message memory message = messages[_index];
    return (message.index, message.owner, message.messageType, message.text, message.imageUrl, message.timestamp);
  }

  function setUser(string _name, string _avatarUrl) public {
    addressToUser[msg.sender].name = _name;
    addressToUser[msg.sender].avatarUrl = _avatarUrl;
  }

  function getUser(address _address) public view returns (string name, string avatarUrl) {
    User memory user = addressToUser[_address];
    return (user.name, user.avatarUrl);
  }
}
