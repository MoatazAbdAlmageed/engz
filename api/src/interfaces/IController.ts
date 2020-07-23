export default interface Controller {
  create: (req, res, next?) => any;
  list: (req, res, next?) => any;
  update: (req, res, next?) => any;
  deleteItem: (req, res, next?) => any;
}
