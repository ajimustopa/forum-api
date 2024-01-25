const NewComment = require("../NewComment");

describe("NewComment entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      threadId: "thread123",
      content: "This is a comment",
      owner: "user123",
    };

    // Act
    const newComment = new NewComment(payload);

    // Assert
    expect(newComment.threadId).toBe(payload.threadId);
    expect(newComment.content).toBe(payload.content);
    expect(newComment.owner).toBe(payload.owner);
  });

  it("should throw error if payload is incomplete", () => {
    // Arrange
    const incompletePayload = {
      threadId: "thread123",
      content: "This is a comment",
      // Missing owner
    };

    // Act & Assert
    expect(() => new NewComment(incompletePayload)).toThrowError("NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if payload has incorrect data types", () => {
    // Arrange
    const invalidPayload = {
      threadId: "thread123",
      content: "This is a comment",
      owner: 123, // owner should be a string
    };

    // Act & Assert
    expect(() => new NewComment(invalidPayload)).toThrowError("NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });
});
