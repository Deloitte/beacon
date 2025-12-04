export function mapToKeyValue(map: any) {
  const obj = Object.create(null);
  for (const [k, v] of map) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

export function registerEvent(
  element: any,
  type: string,
  listener: {
    (event: { target: any; srcElement: any }): void;
    (event: any): void;
  }
) {
  element.addEventListener(type, listener, false);
}

export function getClickXandY(e: {
  target?: any;
  srcElement?: any;
  pageY?: any;
  pageX?: any;
  clientX?: any;
  clientY?: any;
}): any {
  if (typeof e.pageY !== 'undefined' && typeof e.pageX !== 'undefined') {
    return {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    };
  } else {
    return {
      x: null,
      y: null,
    };
  }
}

export function UUID() {
  const b = crypto.getRandomValues(new Uint16Array(8));
  const d = [].map
    .call(b, (a: any) => a.toString(16).padStart(4, '0'))
    .join('');
  const vr = (((b[5] >> 12) & 3) | 8).toString(16);
  return `${d.substr(0, 8)}-${d.substr(8, 4)}-4${d.substr(13, 3)}-${vr}${d.substr(17, 3)}-${d.substr(20, 12)}`;
}

export function getNow() {
  return new Date().toISOString();
}

export function getTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}
