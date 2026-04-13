import { ElementMatcher } from '@structures/queue/queue.structure-type';

export const basicMatcher: ElementMatcher<string> = elems => {
  if (elems.length >= 2) {
    return [elems[0], elems[1]];
  }
  return null;
};
