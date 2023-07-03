const isValidEmail = (email) => (
  /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,20}$/.test(email)
);

export { isValidEmail };
