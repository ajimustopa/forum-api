const DeleteComment = require("../DeleteComment");

describe("DeleteComment entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      id: "comment123",
      owner: "user123",
      threadId: "thread456",
    };

    // Act
    const deleteComment = new DeleteComment(payload);

    // Assert
    expect(deleteComment.id).toBe(payload.id);
    expect(deleteComment.owner).toBe(payload.owner);
    expect(deleteComment.threadId).toBe(payload.threadId);
  });

  it("should throw error if payload is incomplete", () => {
    // Arrange
    const incompletePayload = {
      id: "comment123",
      // Missing owner and threadId
    };

    // Act & Assert
    expect(() => new DeleteComment(incompletePayload)).toThrowError("DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if payload has incorrect data types", () => {
    // Arrange
    const invalidPayload = {
      id: "comment123",
      owner: "user123",
      threadId: 456, // threadId should be a string
    };

    // Act & Assert
    expect(() => new DeleteComment(invalidPayload)).toThrowError("DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });
});
