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
      email: 'v.almeida1284@gmail.com',
      name: 'Vinicius Almeida',
    },
  },
} as IMailConfig;
