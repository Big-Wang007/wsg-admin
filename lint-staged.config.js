export default {
  "*.js?(x)": ["eslint --fix", "prettier --write"],
  "*.ts?(x)": ["eslint --fix", "prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write"],
  "*.{json,html,css,md}": ["prettier --write"],
};
