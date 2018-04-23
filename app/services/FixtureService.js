export default {
  /* eslint-disable global-require, import/no-dynamic-require */
  userSignIn: token => ({
    ok: true,
    data: require(`../fixtures/user/signin.json`),
  }),
  /* eslint-enable */
};
