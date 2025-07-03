interface AuthRequest extends Express.Request {
  body: {
    username: string;
    password: string;
  };
}

interface AuthResponse extends Express.Response {}
interface RegisterRequest extends Express.Request {
  body: {
    companyName: string;
    email: string;
    password: string;
  };
}
interface RegisterResponse extends Express.Response {}
export const loginUser = async (
  req: AuthRequest,
  res: AuthResponse
): Promise<void> => {};
export const registerUser = async (
  req: RegisterRequest,
  res: RegisterResponse
) => {};
