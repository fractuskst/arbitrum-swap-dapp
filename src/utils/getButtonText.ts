export const getButtonText = (isLoading: boolean, isApproved: boolean) => {
  if (isLoading) {
    return isApproved ? 'Swap In Progress...' : 'Approving...';
  }
  return isApproved ? 'Swap' : 'Approve';
};
