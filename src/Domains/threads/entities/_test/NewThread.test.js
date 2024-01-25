const NewThread = require("../NewThread");

describe("NewThread entity", () => {
  it("should create instance correctly", () => {
    // Arrange
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: "user123",
    };

    // Act
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread.title).toBe(payload.title);
    expect(newThread.body).toBe(payload.body);
    expect(newThread.owner).toBe(payload.owner);
  });

  it("should throw error if payload is incomplete", () => {
    // Arrange
    const incompletePayload = {
      title: "Thread Title",
      // Missing body and owner
    };

    // Act & Assert
    expect(() => new NewThread(incompletePayload)).toThrowError("NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if payload has incorrect data types", () => {
    // Arrange
    const invalidPayload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: 123, // owner should be a string
    };

    // Act & Assert
    expect(() => new NewThread(invalidPayload)).toThrowError("NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });
});
