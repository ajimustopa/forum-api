const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const Comment = require("../../../Domains/comments/entities/Comment");

// Mock the database pool
const mockPool = {
  query: jest.fn(),
};

// Mock the ID generator function
const mockIdGenerator = jest.fn();

describe("CommentRepositoryPostgres", () => {
  let commentRepository;

  beforeEach(() => {
    mockPool.query.mockReset(); // Reset mock calls for each test
    commentRepository = new CommentRepositoryPostgres(mockPool, mockIdGenerator);
  });

  it("should add comment correctly", async () => {
    // Arrange
    const newComment = {
      content: "This is a new comment",
      owner: "user123",
      threadId: "thread456",
    };

    const expectedId = "comment-123";
    mockIdGenerator.mockReturnValue(expectedId);

    const mockQueryResult = {
      rows: [{ id: expectedId, content: newComment.content, owner: newComment.owner }],
    };

    mockPool.query.mockResolvedValue(mockQueryResult);

    // Act
    const addedComment = await commentRepository.addComment(newComment);

    // Assert
    expect(addedComment).toBeInstanceOf(AddedComment);
    expect(addedComment.id).toBe(expectedId);
    expect(addedComment.content).toBe(newComment.content);
    expect(addedComment.owner).toBe(newComment.owner);
  });

  // Add more tests for other methods (isCommentExist, isCommentOwner, deleteComment, getCommentsByThreadId)...

  // Example test for isCommentExist
  it("should check if comment exists correctly", async () => {
    // Arrange
    const commentId = "comment-123";
    const mockQueryResult = {
      rowCount: 1,
    };

    mockPool.query.mockResolvedValue(mockQueryResult);

    // Act
    const result = await commentRepository.isCommentExist(commentId);

    // Assert
    expect(result).toBe(true);
    expect(mockPool.query).toHaveBeenCalledWith(expect.objectContaining({ values: [commentId] }));
  });

  // Example test for isCommentOwner
  it("should check if user is the owner of a comment correctly", async () => {
    // Arrange
    const commentId = "comment-123";
    const owner = "user123";
    const mockQueryResult = {
      rows: [{ owner: "user123" }],
    };

    mockPool.query.mockResolvedValue(mockQueryResult);

    // Act
    const result = await commentRepository.isCommentOwner(commentId, owner);

    // Assert
    expect(result).toBe(true);
    expect(mockPool.query).toHaveBeenCalledWith(expect.objectContaining({ values: [commentId] }));
  });
});
