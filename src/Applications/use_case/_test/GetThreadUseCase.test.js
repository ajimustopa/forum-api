const GetThreadUseCase = require("../GetThreadUseCase");
const Thread = require("../../../Domains/threads/entities/Thread");
const Comment = require("../../../Domains/comments/entities/Comment");

describe("GetThreadUseCase", () => {
  it("should successfully get a thread with comments", async () => {
    // Arrange
    const threadId = "thread123";

    const mockThreadRepository = {
      getThreadById: jest.fn(() =>
        Promise.resolve(
          new Thread({
            id: threadId,
            title: "Thread Title",
            body: "Thread Body",
            date: "2024-01-25",
            username: "user123",
          })
        )
      ),
    };

    const mockCommentRepository = {
      getCommentsByThreadId: jest.fn(() =>
        Promise.resolve([
          new Comment({
            id: "comment123",
            username: "user456",
            date: "2024-01-26",
            content: "This is a comment",
            isDelete: false,
          }),
        ])
      ),
    };

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    const result = await getThreadUseCase.execute(threadId);

    // Assert
    expect(result).toBeInstanceOf(Thread);
    expect(result.id).toBe(threadId);
    expect(result.comments).toHaveLength(1);
    expect(result.comments[0]).toBeInstanceOf(Comment); // Ensure comments are instances of Comment
    expect(result.comments[0].id).toBe("comment123");
  });

  it("should throw an error when thread is not found", async () => {
    // Arrange
    const threadId = "nonExistentThread";

    const mockThreadRepository = {
      getThreadById: jest.fn(() => Promise.resolve(null)),
    };

    const mockCommentRepository = {
      getCommentsByThreadId: jest.fn(),
    };

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act & Assert
    await expect(getThreadUseCase.execute(threadId)).rejects.toThrowError("GET_THREAD_USE_CASE.THREAD_NOT_FOUND");
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).not.toHaveBeenCalled();
  });
});
