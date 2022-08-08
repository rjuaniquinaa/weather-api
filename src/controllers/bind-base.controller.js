import autoBind from 'auto-bind';

export class BindBaseController {
  constructor() {
    autoBind(this);
  }
}
