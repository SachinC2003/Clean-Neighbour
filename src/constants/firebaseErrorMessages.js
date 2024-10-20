export function decodeFirebaseError (error) {
    let errorMessage = 'An error occurred';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-disabled':
        errorMessage = 'User account is disabled';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid credentials'
        break;
      case 'auth/missing-password':
        errorMessage = 'Missing password';
        break;
      case 'auth/network-request-failed':
        errorMessage = "Internet connection not available"
        break;
      case 'auth/email-already-in-use':
        errorMessage = "User with email already exists"
        break;
      case 'auth/weak-password':
      errorMessage = extractWeakPasswordErrorMessage(error.message);
      break;
      
      break;
      
      default:
        errorMessage = 'An error occurred';
        break;
    }
    return errorMessage;
  };
  const extractWeakPasswordErrorMessage = (errorMessage) => {
    const startIndex = errorMessage.indexOf('Firebase:');
    const endIndex = errorMessage.indexOf('(');
    if (startIndex !== -1 && endIndex !== -1) {
      return errorMessage.substring(startIndex + 'Firebase:'.length, endIndex).trim();
    }
    return 'Weak password';
  };
  