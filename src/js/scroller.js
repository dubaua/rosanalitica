import { throttle } from 'throttle-debounce';

const horizontalScrollerSelector = '[data-scroller]';
const horizontalScrollerContainerSelector = '[data-scroller-container]';
const horizontalScrollerNodeList = document.querySelectorAll(horizontalScrollerSelector);
const atStartClassname = 'scroller--start';
const atEndClassname = 'scroller--end';

for (let i = 0; i < horizontalScrollerNodeList.length; i++) {
  const horizontalScrollerNode = horizontalScrollerNodeList[i];
  const horizontalScrollerContainerNode = horizontalScrollerNode.querySelector(horizontalScrollerContainerSelector);

  horizontalScrollerContainerNode.addEventListener(
    'scroll',
    throttle(60, () => {
      drawScroll(horizontalScrollerNode, horizontalScrollerContainerNode);
    }),
    { passive: true },
  );

  drawScroll(horizontalScrollerNode, horizontalScrollerContainerNode);
}
unction Scroller({ children, className, horizontal }: Props) {
  const [reachBoundaries, setReachBoundaries] = useState({
    start: true,
    end: false
  });

  function hadnleScroll(e) {
    const {
      scrollTop,
      scrollHeight,
      offsetHeight,
      scrollLeft,
      scrollWidth,
      offsetWidth
    } = e.target;
    const start = horizontal ? scrollLeft <= 0 : scrollTop <= 0;
    const end = horizontal
      ? scrollLeft >= scrollWidth - offsetWidth
      : scrollTop >= scrollHeight - offsetHeight;
    setReachBoundaries({ start, end });
  }

  const containerClassNames = cx(
    className,
    styles.container,
    horizontal ? styles.containerHorizontal : styles.containerVertical
  );

  const { start, end } = reachBoundaries;

  const startFadeClassNames = cx(
    styles.startFade,
    horizontal ? styles.startFadeHorizontal : styles.startFadeVertical,
    {
      [styles.startFadeActive]: !start
    }
  );

  const endFadeClassNames = cx(
    styles.endFade,
    horizontal ? styles.endFadeHorizontal : styles.endFadeVertical,
    { [styles.endFadeActive]: !end }
  );

  return (
    <div className={styles.scroller}>
      <div className={containerClassNames} onScroll={hadnleScroll}>
        {children}
      </div>
      <div className={startFadeClassNames} />
      <div className={endFadeClassNames} />
    </div>
  );
}

Scroller.defaultProps = { className: undefined, horizontal: false };

export default Scroller;