class ApprovalError extends Error {
  constructor(body) {
    const errors = body.errors;
    let errorMessage = 'Failed to approve application:';
    errors.map(e => e.message).forEach(message => {
      errorMessage += `\n\t* ${message}`;
    });
    super(errorMessage);
    this.name = 'ApprovalError';
  }
}

class RevertApprovalError extends Error {
  constructor(body) {
    const errors = body.errors;
    let errorMessage = 'Failed to revert application:';
    errors.map(e => e.message).forEach(message => {
      errorMessage += `\n\t* ${message}`;
    });
    super(errorMessage);
    this.name = 'RevertApprovalError';
  }
}

module.exports = { ApprovalError, RevertApprovalError };
