const CommentRepository = require("../CommentRepository");

describe("CommentRepository", () => {
  let commentRepository;

  beforeEach(() => {
    commentRepository = new CommentRepository();
  });

  it('should throw "METHOD_NOT_IMPLEMENTED" error for addComment', async () => {
    await expect(commentRepository.addComment()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it('should throw "METHOD_NOT_IMPLEMENTED" error for isCommentExist', async () => {
    await expect(commentRepository.isCommentExist()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it('should throw "METHOD_NOT_IMPLEMENTED" error for isCommentOwner', async () => {
    await expect(commentRepository.isCommentOwner()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it('should throw "METHOD_NOT_IMPLEMENTED" error for deleteComment', async () => {
    await expect(commentRepository.deleteComment()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it('should throw "METHOD_NOT_IMPLEMENTED" error for getCommentsByThreadId', async () => {
    await expect(commentRepository.getCommentsByThreadId()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
