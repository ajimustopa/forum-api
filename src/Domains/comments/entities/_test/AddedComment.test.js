const AddedComment = require("../AddedComment");

describe("AddedComment entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      id: "comment123",
      content: "This is an added comment",
      owner: "user123",
    };

    // Act
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toBe(payload.id);
    expect(addedComment.content).toBe(payload.content);
    expect(addedComment.owner).toBe(payload.owner);
  });

  it("should throw error if payload is incomplete", () => {
    // Arrange
    const incompletePayload = {
      id: "comment123",
      content: "This is an added comment",
      // Missing owner
    };

    // Act & Assert
    expect(() => new AddedComment(incompletePayload)).toThrowError("ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if payload has incorrect data types", () => {
    // Arrange
    const invalidPayload = {
      id: "comment123",
      content: "This is an added comment",
      owner: 123, // owner should be a string
    };

    // Act & Assert
    expect(() => new AddedComment(invalidPayload)).toThrowError("ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });
});
