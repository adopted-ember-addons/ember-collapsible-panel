export default {
  extends: 'recommended',
  checkHbsTemplateLiterals: false,
  rules: {
    // cp-panel-toggle uses tagName='a' (classic component), yield-only is intentional
    'no-yield-only': 'off',
  },
};
