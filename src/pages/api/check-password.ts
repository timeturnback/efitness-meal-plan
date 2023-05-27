import myFirebase from '@/hooks/useAuth';

export default async function handler(req: any, res: any) {
  const { email, password } = req.body;

  try {
    await myFirebase.auth().signInWithEmailAndPassword(email, password);

    res.status(200).json({
      message: 'ok',
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Password is incorrect', error: error.code });
  }
}
