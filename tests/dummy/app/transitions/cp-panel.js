import moveOver from "./move-over";

export default function(opts) {
  if (this.newElement) {
    return moveOver.call(this, 'y', 1, opts);
  } else {
    return moveOver.call(this, 'y', -1, opts);
  }
}
