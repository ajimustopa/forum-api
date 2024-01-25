const AddCommentUseCase = require("../AddCommentUseCase");

// Mock the comment repository and thread repository
const mockCommentRepository = {
  addComment: jest.fn(),
};

const mockThreadRepository = {
  isThreadExist: jest.fn(),
};

describe("AddCommentUseCase", () => {
  let addCommentUseCase;

  beforeEach(() => {
    mockCommentRepository.addComment.mockReset();
    mockThreadRepository.isThreadExist.mockReset();
    addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
  });

  it("should add comment successfully when thread exists", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread123",
      content: "This is a new comment",
      owner: "user123",
    };

    const isThreadExist = true;
    const expectedNewComment = { id: "comment123", ...useCasePayload };
    mockThreadRepository.isThreadExist.mockResolvedValue(isThreadExist);
    mockCommentRepository.addComment.mockResolvedValue(expectedNewComment);

    // Act
    const result = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(result).toEqual(expectedNewComment);
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should throw error when trying to add comment to non-existent thread", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "nonExistentThread",
      content: "This is a new comment",
      owner: "user123",
    };

    const isThreadExist = false;
    mockThreadRepository.isThreadExist.mockResolvedValue(isThreadExist);

    // Act & Assert
    await expect(addCommentUseCase.execute(useCasePayload)).rejects.toThrowError("ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND");
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).not.toHaveBeenCalled();
  });

  // Add more tests for other scenarios...
});
