interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'no-reply.donbarzini@manaosfactory.com',
      name: 'Equipe Don Barzini',
    },
  },
} as IMailConfig;
