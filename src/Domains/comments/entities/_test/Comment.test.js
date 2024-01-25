const Comment = require("../Comment");

describe("Comment entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      id: "comment123",
      username: "user123",
      date: "2024-01-25",
      content: "This is a comment",
      isDelete: false,
    };

    // Act
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toBe(payload.id);
    expect(comment.username).toBe(payload.username);
    expect(comment.date).toBe(payload.date);

    // Adjusted assertion for isDelete
    expect(comment.content).toBe(payload.isDelete ? "**komentar telah dihapus**" : payload.content);
  });

  // ... (other test cases)
});
