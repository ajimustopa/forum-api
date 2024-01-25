const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe("DeleteCommentUseCase", () => {
  it("should successfully delete a comment", async () => {
    // Arrange
    const useCasePayload = {
      id: "comment123",
      owner: "user123",
      threadId: "thread456",
    };

    const mockThreadRepository = {
      isThreadExist: jest.fn(() => Promise.resolve(true)),
    };

    const mockCommentRepository = {
      isCommentExist: jest.fn(() => Promise.resolve(true)),
      isCommentOwner: jest.fn(() => Promise.resolve(true)),
      deleteComment: jest.fn(),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist).toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.isCommentOwner).toHaveBeenCalledWith(useCasePayload.id, useCasePayload.owner);
    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(useCasePayload.id);
  });

  it("should throw an error when thread is not found", async () => {
    // Arrange
    const useCasePayload = {
      id: "comment123",
      owner: "user123",
      threadId: "nonExistentThread",
    };

    const mockThreadRepository = {
      isThreadExist: jest.fn(() => Promise.resolve(false)),
    };

    const mockCommentRepository = {
      isCommentExist: jest.fn(),
      isCommentOwner: jest.fn(),
      deleteComment: jest.fn(),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Act & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrowError("DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND");
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist).not.toHaveBeenCalled();
    expect(mockCommentRepository.isCommentOwner).not.toHaveBeenCalled();
    expect(mockCommentRepository.deleteComment).not.toHaveBeenCalled();
  });

  // Add more tests for other error cases...
});
