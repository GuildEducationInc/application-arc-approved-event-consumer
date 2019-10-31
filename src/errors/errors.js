class ApprovalError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApprovalError';
  }
}

module.exports = { ApprovalError };
