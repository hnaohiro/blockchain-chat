let Chat = artifacts.require("Chat");

contract("Chat", function(accounts) {
  describe("sendText", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should get text", async function() {
      let input = "hoge";
      await chat.sendText(input);

      let message = await chat.getMessage(0);
      assert.equal(message[0], 1);
      assert.equal(message[1], accounts[0]);
      assert.equal(message[2], 0);
      assert.equal(message[3], input);
      assert.equal(message[4], "");
      assert.isAbove(message[5].toNumber(), 0);
    });
  });

  describe("sendImage", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should get imageUrl", async function() {
      let imageUrl = "http://localhost/test.jpg";
      await chat.sendImage(imageUrl);

      let message = await chat.getMessage(0);
      assert.equal(message[0], 1);
      assert.equal(message[1], accounts[0]);
      assert.equal(message[2], 1);
      assert.equal(message[3], "");
      assert.equal(message[4], imageUrl);
      assert.isAbove(message[5].toNumber(), 0);
    });
  });

  describe("getLength", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should return 2", async function() {
      await chat.sendText("a");
      await chat.sendText("b");

      let length = await chat.getLength();
      assert.equal(length, 2);
    });
  });

  describe("getMessage", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should throw error", async function() {
      let err = null;

      try {
        await chat.getMessage(100);
      } catch (error) {
        err = error;
      }

      assert.ok(err instanceof Error);
    });
  });

  describe("getUser", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should be empty string", async function() {
      let user = await chat.getUser();
      assert.equal(user[0], "");
      assert.equal(user[1], "");
    });
  });

  describe("setUser", function() {
    let chat;

    before(async function() {
      chat = await Chat.new();
    });

    it("should get name", async function() {
      const name = "hoge";
      const avatarUrl = "";
      await chat.setUser(name, avatarUrl);

      let user = await chat.getUser();
      assert.equal(user[0], name);
      assert.equal(user[1], avatarUrl);
    });

    it("should get avatarUrl", async function() {
      const name = "";
      const avatarUrl = "http://localhost/avatar.jpg";
      await chat.setUser(name, avatarUrl);

      let user = await chat.getUser();
      assert.equal(user[0], name);
      assert.equal(user[1], avatarUrl);
    });

    it("should get name and avatarUrl", async function() {
      const name = "hoge";
      const avatarUrl = "http://localhost/avatar.jpg";
      await chat.setUser(name, avatarUrl);

      let user = await chat.getUser();
      assert.equal(user[0], name);
      assert.equal(user[1], avatarUrl);
    });

    it("should override", async function() {
      const name1 = "hoge";
      await chat.setUser(name1, "");

      const name2 = "moge";
      await chat.setUser(name2, "");

      let user = await chat.getUser();
      assert.equal(user[0], name2);
    });
  });
});
