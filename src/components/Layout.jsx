export function Stack({ children, gap }) {
  const style = gap ? `--gap:${gap}` : null;
  return (
    <div className="stack" style={style}>
      {children}
    </div>
  );
}

export function Flex({
  children, gap, center, nowrap,
}) {
  const style = {};
  if (gap) {
    style['--gap'] = gap;
  }
  if (center) {
    style['align-items'] = 'center';
  }
  if (nowrap) {
    style['flex-wrap'] = 'nowrap';
  }
  return (
    <div className="hstack" style={style}>
      {children}
    </div>
  );
}
