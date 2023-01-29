import type { NextApiRequest } from 'next';

import optionsSelectHTML from '@/send-email/options';

import { transporter } from './config/nodemailer';

const handler = async (req: NextApiRequest) => {
  if (req.method === 'POST') {
    const { resetPassword } = optionsSelectHTML();
    const data = req.body;
    if (!data.email || !data.code || !data.to) {
      //
      return;
    }
    try {
      const option = resetPassword(data.email, data.code);
      transporter.sendMail({
        from: process.env.NEXT_PUBLIC_FROM_EMAIL,
        to: data.to,
        ...option,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
};

export default handler;
