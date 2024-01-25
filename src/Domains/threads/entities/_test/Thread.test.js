const Comment = require("../../../comments/entities/Comment");
const Thread = require("../Thread");

describe("Thread entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      id: "thread123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2024-01-25",
      username: "user123",
    };

    // Act
    const thread = new Thread(payload);

    // Assert
    expect(thread.id).toBe(payload.id);
    expect(thread.title).toBe(payload.title);
    expect(thread.body).toBe(payload.body);
    expect(thread.date).toBe(payload.date);
    expect(thread.username).toBe(payload.username);
    expect(thread.comments).toEqual([]); // comments should be an empty array initially
  });

  it("should throw error if payload is incomplete", () => {
    // Arrange
    const incompletePayload = {
      id: "thread123",
      title: "Thread Title",
      // Missing body, date, and username
    };

    // Act & Assert
    expect(() => new Thread(incompletePayload)).toThrowError("THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if payload has incorrect data types", () => {
    // Arrange
    const invalidPayload = {
      id: "thread123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2024-01-25",
      username: 123, // username should be a string
    };

    // Act & Assert
    expect(() => new Thread(invalidPayload)).toThrowError("THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should set comments correctly", () => {
    // Arrange
    const thread = new Thread({
      id: "thread123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2024-01-25",
      username: "user123",
    });

    const comments = [
      new Comment({
        id: "comment1",
        username: "user456",
        date: "2024-01-26",
        content: "This is a comment",
        isDelete: false,
      }),
      new Comment({
        id: "comment2",
        username: "user789",
        date: "2024-01-27",
        content: "Another comment",
        isDelete: false,
      }),
    ];

    // Act
    thread.setComments(comments);

    // Assert
    expect(thread.comments).toEqual(comments);
  });

  it("should throw error if comments is not an array", () => {
    // Arrange
    const thread = new Thread({
      id: "thread123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2024-01-25",
      username: "user123",
    });

    // Act & Assert
    expect(() => thread.setComments("invalid")).toThrowError("THREAD.COMMENTS_NOT_ARRAY");
  });

  it("should throw error if comments contain invalid members", () => {
    // Arrange
    const thread = new Thread({
      id: "thread123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2024-01-25",
      username: "user123",
    });

    const invalidComments = [
      new Comment({
        id: "comment1",
        username: "user456",
        date: "2024-01-26",
        content: "This is a comment",
        isDelete: false,
      }),
      "invalid comment",
    ];

    // Act & Assert
    expect(() => thread.setComments(invalidComments)).toThrowError("THREAD.COMMENTS_CONTAINS_INVALID_MEMBER");
  });
});
